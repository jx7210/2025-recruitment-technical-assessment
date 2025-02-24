from dataclasses import dataclass
from typing import List, Dict, Union
from flask import Flask, request, jsonify
import re
from collections import Counter


# ==== Type Definitions, feel free to add or modify ===========================
@dataclass
class CookbookEntry:
	name: str

@dataclass
class RequiredItem():
	name: str
	quantity: int

@dataclass
class Recipe(CookbookEntry):
	required_items: List[RequiredItem]

@dataclass
class Ingredient(CookbookEntry):
	cook_time: int


# =============================================================================
# ==== HTTP Endpoint Stubs ====================================================
# =============================================================================
app = Flask(__name__)

# Store your recipes here!
cookbook = {}

# Task 1 helper (don't touch)
@app.route("/parse", methods=['POST'])
def parse():
	data = request.get_json()
	recipe_name = data.get('input', '')
	parsed_name = parse_handwriting(recipe_name)
	if parsed_name is None:
		return 'Invalid recipe name', 400
	return jsonify({'msg': parsed_name}), 200

# [TASK 1] ====================================================================
# Takes in a recipeName and returns it in a form that 
def parse_handwriting(recipeName: str) -> Union[str | None]:
	res = re.sub(r'[-_]', ' ', recipeName) # replace hyphens and underscores with spaces
	res = re.sub(r'[^a-zA-Z\s]', '', res) # remove non-letters and spaces
	res = re.sub(r'\s+', ' ', res).strip() # squish down and remove leading/trailing whitespace
	res = res.title() # capitalise first letter, the rest to lowercase
	return res or None


# [TASK 2] ====================================================================
# Endpoint that adds a CookbookEntry to your magical cookbook
@app.route('/entry', methods=['POST'])
def create_entry():
	data = request.get_json()

	# Validate entry
	validation_error = entry_validation_error(data)
	if validation_error:
		return validation_error, 400

	# Create and add ingredient
	if data['type'] == 'ingredient':
		ingredient = Ingredient(name=data['name'], cook_time=data['cookTime'])
		cookbook[data['name']] = ingredient

	# Create and add recipe
	if data['type'] == 'recipe':
		required_items = []
		for item in data['requiredItems']:
			required_item = RequiredItem(name=item['name'], quantity=item['quantity'])
			required_items.append(required_item)
		recipe = Recipe(name=data['name'], required_items=required_items)
		cookbook[data['name']] = recipe

	return {}, 200

# Helper function that validates CookbookEntry data
# Returns error message if there is one or None if there isn't
def entry_validation_error(data):
	if 'type' not in data or 'name' not in data:
		return "'name' or 'type' key missing on an entry"

	if data['type'] not in ['recipe', 'ingredient']:
		return 'type can only be "recipe" or "ingredient"'

	if data['name'] in cookbook:
		return 'entry names must be unique'

	if data['type'] == 'ingredient':
		if 'cookTime' not in data:
			return "'cookTime' key missing on an ingredient"
		if data['cookTime'] < 0:
			return 'cookTime can only be greater than or equal to 0'

	if data['type'] == 'recipe':
		if 'requiredItems' not in data:
			return "'requiredItems' key missing on a recipe"
		for item in data['requiredItems']:
			if 'name' not in item or 'quantity' not in item:
				return "'name' or 'quantity' key missing on a required item"

		names = [item['name'] for item in data['requiredItems']]
		if len(names) != len(set(names)):
			return 'Recipe requiredItems can only have one element per name'
		
	return None


# [TASK 3] ====================================================================
# Endpoint that returns a summary of a recipe that corresponds to a query name
@app.route('/summary', methods=['GET'])
def summary():
	#get searched name 
	searched_name = request.args.get('name')

	# check if searched name is an existing recipe
	if not cookbook.get(searched_name):
		return 'A recipe with the corresponding name cannot be found', 400
	if isinstance(cookbook[searched_name], Ingredient):
		return 'A recipe with the corresponding name cannot be found', 400

	ingredients_quantity, cook_time = recursive_summary(searched_name)
	if isinstance(ingredients_quantity, dict) and 'error' in ingredients_quantity:
		return "The recipe contains recipes or ingredients that aren't in the cookbook", 400

	ingredients = []
	for ingredient, quantity in ingredients_quantity.items():
		ingredients.append({ 'name': ingredient, 'quantity': quantity })

	return jsonify({
		"name": searched_name,
		"cookTime": cook_time,
		"ingredients": ingredients
	}), 200

# Helper function that aggregates the cooktime and required ingredient quantities for a recipe
# returns ingredients (dict where keys = ingredient name, value = amount), cook time
def recursive_summary(name):
		# check if name is in cookbook
		if not cookbook.get(name):
			return {"error": "The recipe contains recipes or ingredients that aren't in the cookbook"}, 400
		
		entry = cookbook[name]

		# base case: ingredient
		if isinstance(entry, Ingredient):
			ingredients = { name: 1 }
			return ingredients, entry.cook_time

		if isinstance(entry, Recipe):
			total_cook_time = 0
			all_ingredients = {}

			# required items
			for item in entry.required_items:
				ingredients, cook_time = recursive_summary(item.name)

				# Handle the case where we get an error response from recursive_summary
				if isinstance(ingredients, dict) and 'error' in ingredients:
					return ingredients, cook_time

				# sum of the cooktimes of all required items
				total_cook_time += cook_time * item.quantity

				# multiply all ingredient amounts by item quantity
				for ingredient in ingredients:
					ingredients[ingredient] *= item.quantity
				# combine ingredient dict with aggregate ingredient dict for all items
				all_ingredients = dict(Counter(all_ingredients) + Counter(ingredients))

			return all_ingredients, total_cook_time


# =============================================================================
# ==== DO NOT TOUCH ===========================================================
# =============================================================================

if __name__ == '__main__':
	app.run(debug=True, port=8080)
