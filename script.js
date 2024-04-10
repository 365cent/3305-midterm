document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quizForm');
    let score = 0;
    const questions = [];
    let count = 40;
    fetch('quiz.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((q, index) => {
                questions.push({
                    number: index + 1, // Add question number
                    question: q.question,
                    options: q.options,
                    answer: q.answer,
                    type: q.type
                });
            });

            // Randomize questions order
            questions.sort(() => Math.random() - 0.5);

            // Update question numbers after shuffle
            questions.forEach((q, index) => {
                q.number = index + 1;
            });

            count = questions.length;
        })
        .then(() => {
            // for(let i = 0; i < count; i++) {
            questions.forEach(q => {
                // const q = questions[i];
                const fieldset = document.createElement('fieldset');
                const legend = document.createElement('legend');
                legend.className = "font-semibold";
                legend.textContent = `${q.number}. ${q.question}`; // Show question number
                fieldset.classList.add('mb-4');
                fieldset.appendChild(legend);
        
                q.options.forEach(option => {
                    const label = document.createElement('label');
                    label.className = "block";
                    const input = document.createElement('input');
                    input.type = "radio";
                    input.name = `question-${q.number}`;
                    input.value = option;
                    input.className = "mr-2";
                    label.appendChild(input);
                    label.append(option);
                    fieldset.appendChild(label);
        
                    input.addEventListener('change', () => {
                        // Create a feedback span element to show correctness
                        const feedback = document.createElement('span');
                        feedback.className = "ml-2";
                        if (input.value === q.answer) {
                            score++;
                            feedback.textContent = "Correct!";
                            feedback.style.color = "green";
                        } else {
                            feedback.textContent = `Wrong! Correct answer: ${q.answer}`;
                            feedback.style.color = "red";
                        }
                        label.appendChild(feedback); // Append feedback to the label
                        // Disable all options to prevent changing the answer
                        const allInputs = fieldset.querySelectorAll('input');
                        allInputs.forEach(inp => inp.disabled = true);
                    });
                });
        
                // form.insertBefore(fieldset, form.firstChild);
                form.appendChild(fieldset);
            });
        });

    document.getElementById('submitBtn').addEventListener('click', (e) => {
        e.preventDefault();
        const resultDisplay = document.createElement('div');
        resultDisplay.textContent = `Your score is ${score}/${count}`;
        // document.body.insertBefore(resultDisplay, form.nextSibling); // Display score below the form
        form.appendChild(resultDisplay); // Display score below the form
        // Optionally, hide the form and button to prevent further interactions
        // form.style.display = 'none';
        // document.getElementById('submitBtn').style.display = 'none';
    });
});
