document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const themeButton = document.getElementById('theme-btn');

    let shuffledQuestions, currentQuestionIndex;
    let score = 0;
    let timeLeft = 10;
    let timerInterval;

    const correctSound = new Audio('correct.mp3');
    const wrongSound = new Audio('wrong.mp3');

    const questions = [
        {
            question: 'What was the chronic absenteeism rate in Milwaukee Public Schools during the 2021-22 school year?',
            answers: [
                { text: '22.8%', correct: false },
                { text: '34%', correct: false },
                { text: '58%', correct: true },
                { text: '37%', correct: false }
            ]
        },
        {
            question: 'What did the U.S. Department of Education define as chronic absenteeism?',
            answers: [
                { text: 'Missing 5 or more days of school in a year', correct: false },
                { text: 'Missing 15 or more days of school in a year', correct: true },
                { text: 'Missing 10 or more days of school in a year', correct: false },
                { text: 'Missing 20 or more days of school in a year', correct: false }
            ]
        },
        {
            question: 'In 2021-2022 Is chronic absenteeism rate of Milwaukee Public Schools higher than Wisconsin statewide rate?',
            answers: [
                { text: 'No', correct: false },
                { text: 'Yes', correct: true }

            ]
        },
        {
            question: 'According to the US Department of Education, what percentage of students nationwide were chronically absent during the academic year 2016?',
            answers: [
                { text: '16%', correct: true },
                { text: '4%', correct: false },
                { text: '2.8%', correct: false },
                { text: '7%', correct: false }
            ]
        },
        {
            question: 'Which school within the Milwaukee Public School district had a chronic absenteeism rate as high as 97% during 2021 - 22 year?',
            answers: [
                { text: 'Madison High School', correct: false },
                { text: 'Auer Elementary', correct: true },
                { text: 'East High School', correct: false },
                { text: 'Culinary Lab School', correct: false }
            ]
        },
        {
            question: 'What percentage of students screened in Milwaukee Public Schools were found likely to be depressed according to the Milwaukee Health Department?',
            answers: [
                { text: '4%', correct: false },
                { text: '12%', correct: false },
                { text: '16.4%', correct: true },
                { text: '30%', correct: false }
            ]
        },
        {
            question: 'In year 2022, what percentage of students reported feeling sad or hopeless almost daily for over two weeks according to the Wisconsin Department of Public Instruction?',
            answers: [
                { text: '33.7%', correct: true },
                { text: '18.1%', correct: false },
                { text: '12.2%', correct: false },
                { text: '58%', correct: false }
            ]
        },
        {
            question: 'According to the Wisconsin Department of Public Instruction, what percentage of students seriously considered attempting suicide in 2022?',
            answers: [
                { text: '13.7%', correct: false },
                { text: '3.7%', correct: false },
                { text: '2.2%', correct: false },
                { text: '18.1%', correct: true }
            ]
        },
        {
            question: 'In the data story by US department of education, what was the chronic absenteeism rate in Milwaukee Public Schools (MPS) during the 2018-19 school year?',
            answers: [
                { text: '13%', correct: false },
                { text: '45%', correct: false },
                { text: '37%', correct: false },
                { text: 'DATA NOT PROVIDED', correct: true }
            ]
        },
        {
            question: 'Which factor was NOT mentioned as a reason for chronic absenteeism among MPS students?',
            answers: [
                { text: 'Poor health', correct: false },
                { text: ' Economic hardships', correct: false },
                { text: 'Economic hardships', correct: false },
                { text: 'Lack of interest in education', correct: true }
            ]
        },
        {
            question: 'According to the Wisconsin Department of Public Instruction, what percentage of students reported significant problems with anxiety in 2022?',
            answers: [
                { text: '33.7%', correct: false },
                { text: '18.1%', correct: false },
                { text: '52.2%', correct: true },
                { text: '26.4%', correct: false }
            ]
        },
        {
            question: 'In the 2020-21 year , chronic absenteeism rate of MPS was',
            answers: [
                { text: '34%', correct: false },
                { text: '18%', correct: false },
                { text: '37%', correct: true },
                { text: '26%', correct: false }
            ]
        },
        {
            question: 'Which federal education law empowers states to create unique statewide accountability systems and holds schools accountable for chronic absenteeism?',
            answers: [
                { text: ' Elementary and Secondary Education Act (ESEA)', correct: false },
                { text: ' Elementary and Secondary Education Act (ESEA)', correct: false },
                { text: 'Every Student Succeeds Act (ESSA)', correct: true },
                { text: 'Individuals with Disabilities Education Act (IDEA)', correct: false }
            ]
        },
        {
            question: 'According to the data story by US department of education, which grade level had the highest chronic absenteeism rates ',
            answers: [
                { text: 'Elementary school', correct: false },
                { text: 'High school', correct: true },
                { text: 'Middle school', correct: false },
                { text: 'All', correct: false }
            ]
        },
        {
            question: 'According to an article by Badger Institute, what percentage of Milwaukee fourth-graders were proficient in reading in 2019? ',
            answers: [
                { text: '14%', correct: true },
                { text: '58%', correct: false },
                { text: '21%', correct: false },
                { text: '34%', correct: false }
            ]
        },
        {
            question: 'How did MPS respond to the COVID-19 pandemic in terms of offering in-person classes?',
            answers: [
                { text: 'Offered hybrid learning', correct: false },
                { text: 'Moved entirely online', correct: false },
                { text: 'Closed schools and then moved online temporarily', correct: true },
                { text: 'Continued in-person classes without interruptions', correct: false }
            ]
        },
        {
            question: 'What is the chronic absenteeism rate for Wisconsin as a whole during the 2021-22 school year?',
            answers: [
                { text: '58%', correct: false },
                { text: '14%', correct: false },
                { text: '22.8%', correct: true },
                { text: '7.2%', correct: false }
            ]
        },
        {
            question: 'How many schools in the Milwaukee Public Schools district were at less than half capacity during the 2022-2023 school year?',
            answers: [
                { text: '10', correct: false },
                { text: '40', correct: false },
                { text: '20', correct: true },
                { text: '30', correct: false }
            ]
        },
        {
            question: ' What percentage of high poverty schools experienced chronic absenteeism in the 2021-22 school year nationwide?',
            answers: [
                { text: '16%', correct: false },
                { text: '12%', correct: false },
                { text: '31%', correct: false },
                { text: '25%', correct: true }
            ]
        },
        {
            question: ' What was the primary concern expressed by school psychologist Ann Reyes regarding students return to in-person classes?',
            answers: [
                { text: 'Lack of academic progress', correct: false },
                { text: ' Difficulty in maintaining social distancing', correct: false },
                { text: 'Loss of social coping skills', correct: true },
                { text: 'Decrease in standardized test scores', correct: false }
            ]
        },
        {
            question: 'According to Milwaukee Journal Sentinel What percentage of students at Madison High School are identified as having special education needs?',
            answers: [
                { text: '12.2%', correct: false },
                { text: '26.7% ', correct: true },
                { text: '40%', correct: false },
                { text: '20%', correct: false }
            ]
        },
        {
            question: 'What percentage of students at Madison High School were proficient or advanced in reading and language arts according to Wisconsin statewide tests in spring 2023?',
            answers: [
                { text: '2%', correct: true },
                { text: '25% ', correct: false },
                { text: '50%', correct: false },
                { text: '10%', correct: false }
            ]
        },
        {
            question: 'According to the U.S. Department of Education, how many students across the nation were absent for 15 or more days during the academic year?',
            answers: [
                { text: '5 million', correct: false},
                { text: '2 million ', correct: false },
                { text: '7 million', correct: true },
                { text: '3 million', correct: false }
            ]
        },
        {
            question: 'Among 518 students screened by the Milwaukee Health Department, how many were found likely to be depressed?',
            answers: [
                { text: '85', correct: true},
                { text: '25 ', correct: false },
                { text: '175', correct: false },
                { text: '95', correct: false }
            ]
        },
        {
            question: 'What percentage of Milwaukee Public School (MPS) students attended a school where over half of the children were poor in 2008-09?',
            answers: [
                { text: '85%', correct: false},
                { text: '25% ', correct: false },
                { text: '15%', correct: true },
                { text: '95%', correct: false }
            ]
        },
        {
            question: 'What percentage of Milwaukee children were estimated to be not in early childhood education in 2008?',
            answers: [
                { text: '8%', correct: false},
                { text: '5% ', correct: false },
                { text: '25%', correct: false },
                { text: '15%', correct: true }
            ]
        }


    ];

    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    themeButton.addEventListener('click', switchTheme);

    function startGame() {
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.innerText = `Score: ${score}`;
        questionContainerElement.classList.remove('hide');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        startTimer();
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        nextButton.classList.add('hide');
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        stopTimer();
        timeLeft = 10;
        timerElement.innerText = `Time left: ${timeLeft}s`;
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        if (correct) {
            correctSound.play();
            score++;
            scoreElement.innerText = `Score: ${score}`;
        } else {
            wrongSound.play();
        }
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function handleTimeout() {
        Array.from(answerButtonsElement.children).forEach(button => {
            if (button.dataset.correct) {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function switchTheme() {
        document.body.classList.toggle('dark-theme');
    }
});

