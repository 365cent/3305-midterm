import fitz  # PyMuPDF
import re
import json

# Open the PDF
pdf_path = 'quiz.pdf'
doc = fitz.open(pdf_path)

# Extract text
text = ""
for page in doc:
    text += page.get_text()

# Assume each question starts with a number followed by a dot (e.g., "1.")
# Adjust the regex according to the actual question format in the PDF
question_pattern = r'\d+\.\s+(.*?)\n(A\..*?|True|False)\n(B\..*?)?\n(C\..*?)?\n(D\..*?)?\n(E\..*?)?\n?Correct Answer:\s*(\w)'
matches = re.findall(question_pattern, text, re.DOTALL)

questions = []
for match in matches:
    question, *options, correct_answer = match
    options = [opt for opt in options if opt]  # Remove empty options
    question_type = "True/False" if len(options) == 2 else "Multiple Choice"
    correct_answer = correct_answer.strip()

    # Adjust this part to map 'correct_answer' to the actual answer text if needed
    questions.append({
        "question": question.strip(),
        "type": question_type,
        "options": [opt[3:].strip() for opt in options],  # Assuming options start with "A. ", "B. ", etc.
        "answer": correct_answer  # Or map to the correct option text
    })

# Convert to JSON
json_data = json.dumps(questions, indent=4)

# Optionally, save to a file
with open('quiz.json', 'w') as json_file:
    json_file.write(json_data)

print("JSON data created successfully.")
