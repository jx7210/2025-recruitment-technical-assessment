> This question is relevant for **chaos backend**

# DevSoc Subcommittee Recruitment: Chaos Backend

***Complete as many questions as you can.***

## Question 1
You have been given a skeleton function `process_data` in the `data.rs` file.
Complete the parameters and body of the function so that given a JSON request of the form

```json
{
  "data": ["Hello", 1, 5, "World", "!"]
}
```

the handler returns the following JSON:
```json
{
  "string_len": 11,
  "int_sum": 6
}
```

Edit the `DataResponse` and `DataRequest` structs as you need.

## Question 2

### a)
Write (Postgres) SQL `CREATE TABLE` statements to create the following schema.
Make sure to include foreign keys for the relationships that will `CASCADE` upon deletion.
![Database Schema](db_schema.png)

**Answer box:**
```sql
CREATE TABLE forms (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT
);

CREATE TYPE question_type AS ENUM ('ShortAnswer', 'MultiSelect', 'MultiChoice');

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (form_id) REFERENCES forms(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    question_type question_type NOT NULL
);

CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    option TEXT NOT NULL
);
```

### b)
Using the above schema, write a (Postgres) SQL `SELECT` query to return all questions in the following format, given the form id `26583`:
```
   id    |   form_id   |           title             |   question_type   |     options
------------------------------------------------------------------------------------------------------------
 2       | 26583       | What is your full name?     | ShortAnswer       | [null]
 3       | 26583       | What languages do you know? | MultiSelect       | {"Rust", "JavaScript", "Python"}
 7       | 26583       | What year are you in?       | MultiChoice       | {"1", "2", "3", "4", "5+"}
```

**Answer box:**
```sql
SELECT 
    q.id,
    q.form_id,
    q.title,
    q.question_type,
    COALESCE(
        ARRAY(
            SELECT qo.option 
            FROM question_options qo 
            WHERE qo.question_id = q.id
        ), 
        ARRAY[NULL]
    ) AS options
FROM 
    questions q
WHERE 
    q.form_id = 26583
ORDER BY 
    q.id;
```