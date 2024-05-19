document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainerElement = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const themeButton = document.getElementById('theme-btn');
    const factContainerElement = document.getElementById('fact-container');
    const factElement = document.getElementById('fact');
    const sourceElement = document.getElementById('source');
    const questionCountElement = document.getElementById('question-count');

    let shuffledQuestions, currentQuestionIndex;
    let score = 0;
    let timeLeft = 15;
    let timerInterval;

    const correctSound = new Audio('correct.mp3');
    const wrongSound = new Audio('wrong.mp3');

    const questions = [
        {
        question: 'Q. What was the chronic absenteeism rate in Milwaukee Public Schools during the 2021-22 school year?',
            answers: [
                { text: 'A. More than one fourth of the students', correct: false },
                { text: 'B. More than one third of the students', correct: false },
                { text: 'C. More than half of the students', correct: true },
                { text: 'D. 37%', correct: false }
            ],
            fact: 'During the 2021-22 school year, again, the chronic absenteeism rate was 58% in MPS, according to the district’s DPI Report Card',
            source: 'Source: Badger Institute, 2024'
        },
        {
            question: 'Q. What did the U.S. Department of Education define as chronic absenteeism?',
            answers: [
                { text: 'A. Missing 5 or more days of school in a year', correct: false },
                { text: 'B. Missing 15 or more days of school in a year', correct: true },
                { text: 'C. Missing 10 or more days of school in a year', correct: false },
                { text: 'D. Missing 20 or more days of school in a year', correct: false }
            ],
            fact: 'Students who are chronically absent—meaning they miss at least 15 days of school in a year—are at serious risk of falling behind in school.',
            source: 'Source: US Department of Education, 2016'
        },
        {
            question: 'Q. In 2021-2022 Is chronic absenteeism rate of Milwaukee Public Schools higher than Wisconsin statewide rate?',
            answers: [
                { text: 'A. No', correct: false },
                { text: 'B. Yes', correct: true }

            ],
            fact: 'For Wisconsin as a whole, the chronic absenteeism rate during the 2021-22 school year was 22.8%',
            source: 'Source: Badger Institute, 2024'
        },
        {
            question: 'Q. According to the US Department of Education, what percentage of students nationwide were chronically absent during the academic year 2016?',
            answers: [
                { text: 'A. More than 15%', correct: true },
                { text: 'B. Less than 5%', correct: false },
                { text: 'C. More than 10%', correct: false },
                { text: 'D. More than 10%', correct: false }
            ],
            fact: 'The latest data from the U.S. Department of Education and the Civil Rights Data Collection (CRDC) mentions that across the nation, over 7 million students were absent for 15 or more days during the academic year—a staggering 16% of the student population. ',
            source: 'Source: US department of education, 2016'
        },
        {
            question: 'Q. Which school within the Milwaukee Public School district had a chronic absenteeism rate as high as 97% during 2021 - 22 year?',
            answers: [
                { text: 'A. Madison High School', correct: false },
                { text: 'B. Auer Elementary', correct: true },
                { text: 'C. East High School', correct: false },
                { text: 'D. Culinary Lab School', correct: false }
            ],
            fact: 'There are at least 20 schools in the district that were at less than half capacity in the last school year, Absenteeism rates for the last school year are not readily available, but data released by DPI does run through the 2021-22 school year.Chronic absenteeism rates in those 20 schools that year were between 61% at Bryant Elementary and 97% at Auer Elementary.',
            source: 'Source: MPS report card, 2024'
        },
        {
            question: 'Q. What percentage of students screened in Milwaukee Public Schools were found likely to be depressed according to the Milwaukee Health Department?',
            answers: [
                { text: 'A. Less than 1%', correct: false },
                { text: 'B. More than 5%', correct: false },
                { text: 'C. More than 15%', correct: true },
                { text: 'D. More than 30%', correct: false }
            ],
            fact: 'Based on study by Milwaukee Health Department named “Depression Screening in Milwaukee Public Schools” Among 518 students screened, 85 students (16.4%) were found likely to be depressed',
            source: 'Source: Milwaukee Health Department, 2003'
        },
        {
            question: 'Q. In year 2022, what percentage of students reported feeling sad or hopeless almost daily for over two weeks according to the Wisconsin Department of Public Instruction?',
            answers: [
                { text: 'A. More than 30%', correct: true },
                { text: 'B. More than 20%', correct: false },
                { text: 'C. More than 10%', correct: false },
                { text: 'D. Less than 5%', correct: false }
            ],
            fact: ' Over one-third of all Wisconsin students surveyed (33.7 percent) reported feeling sad or hopeless almost every day for more than two weeks in a row, a statistically significant increase of 5.2 percentage points since 2019 and the highest rate since the YRBS(Youth Risk Behavior Survey) was first administered',
            source: 'Source: Wisconsin Department of Public Instruction, 2022'
        },
        {
            question: 'Q. According to the Wisconsin Department of Public Instruction, what percentage of students seriously considered attempting suicide in 2022?',
            answers: [
                { text: 'A. Less than 1%', correct: false },
                { text: 'B. More than 5%', correct: false },
                { text: 'C. Around 2%', correct: false },
                { text: 'D. More than 15%', correct: true }
            ],
            fact: 'Results from the YRBS(Youth Risk Behavior Survey) showed 18.1 percent of all students surveyed seriously considered attempting suicide in the past 12 months, the highest rate since 2003. ',
            source: 'Source: Wisconsin Department of Public Instruction, 2022'
        },
        {
            question: 'Q. In the data story by US department of education, what was the chronic absenteeism rate in Milwaukee Public Schools (MPS) during the 2018-19 school year?',
            answers: [
                { text: 'A. More than 10%', correct: false },
                { text: 'B. More than 50%', correct: false },
                { text: 'C. More than 60%', correct: false },
                { text: 'D. DATA NOT PROVIDED', correct: true }
            ],
            fact: 'In a data story by US education department in 2015 -16, in the geography of chronic absentees, for Milwaukee School District it mentioned “NO DATA”. Lack of data maybe be due to – The chronic absenteeism was not applicable to the school, The school reported incomplete data for enrollment and/or the chronic absenteeism count for at least one race/ethnicity subgroup.The chronic absenteeism count was larger than the K-12 enrollment overall.' ,
            
            source: 'Source: US Department of Education, 2016'
        },
        {
            question: 'Q. Which factor was NOT mentioned as a reason for chronic absenteeism among MPS students?',
            answers: [
                { text: 'A. Poor health', correct: false },
                { text: 'B. Economic hardships', correct: false },
                { text: 'C. Economic hardships', correct: false },
                { text: 'D. Lack of interest in education', correct: true }
            ],
            fact: 'Based on research by UW milwaukee titled - "Socio-Economic Analysis of Issues Facing Children and Families in Milwaukee Public Schools", it mentions issues facing Milwaukee Public Schools as - housing crisis, crime, child care, driver licence policies, recession, earnings of milwaukee families, incarceration. ',
            source: 'Source: University of Wisconsin Milwaukee, 2019'
        },
        {
            question: 'Q. According to the Wisconsin Department of Public Instruction, what percentage of students reported significant problems with anxiety in 2022?',
            answers: [
                { text: 'A. More than 30%', correct: false },
                { text: 'B. More than 15%', correct: false },
                { text: 'C. More than 50%', correct: true },
                { text: 'D. More than 25%', correct: false }
            ], 
            fact: ' More than half of all students surveyed (52.2 percent) self-reported “significant problems with anxiety,” with 80.5 percent of students who identify as lesbian, gay, or bisexual (LGB) saying they have anxiety challenges.',
            source: 'Source: Wisconsin Department of Public Instruction, 2022'
        },
        {
            question: 'Q. In the 2020-21 year , chronic absenteeism rate of MPS was',
            answers: [
                { text: 'A. More thank 10%', correct: false },
                { text: 'B. More than 20%', correct: false },
                { text: 'C. More than 35%', correct: true },
                { text: 'D. More than 40%', correct: false }
            ],
            fact: 'In the academic year 2020-21 in MPS, chronic absenteeism was 37%.',
            source: 'Source: Badger Institute, 2024'
        },
        {
            question: 'Q. Which federal education law empowers states to create unique statewide accountability systems and holds schools accountable for chronic absenteeism?',
            answers: [
                { text: 'A. Elementary and Secondary Education Act (ESEA)', correct: false },
                { text: 'B. Elementary and Secondary Education Act (ESEA)', correct: false },
                { text: 'C. Every Student Succeeds Act (ESSA)', correct: true },
                { text: 'D. Individuals with Disabilities Education Act (IDEA)', correct: false }
            ],
            fact: 'Every Student Succeeds Act that lessened standardized tests and added other measurements to get a more rounded picture of school outcomes. Schools began adding the arts and other programs back to the curriculum.',
            source: 'Source: Urban Milwaukee, 2022'
        },
        {
            question: 'Q. According to the data story by US department of education, which grade level had the highest chronic absenteeism rates ',
            answers: [
                { text: 'A. Elementary school', correct: false },
                { text: 'B. High school', correct: true },
                { text: 'C. Middle school', correct: false },
                { text: 'D. All', correct: false }
            ],
            fact: 'In high school, about 1 in 5 students is chronically absent.Overall, more than 20 percent of students in high school are chronically absent compared with more than 14 percent of students in middle school.',
            source: 'Source: US Department of Education, 2016'
          
        },
        {
            question: 'Q. In 2019 what percentage of Milwaukee fourth-graders were proficient in reading? ',
            answers: [
                { text: 'A. Less than 15%', correct: true },
                { text: 'B. More than 30%', correct: false },
                { text: 'C. More than 20%', correct: false },
                { text: 'D. More than 50%', correct: false }
            ],
            fact: 'According to Matt Ladner, senior adviser for education policy at the Heritage Foundation in 2019, even before the pandemic, only 14% of Milwaukee fourth-graders were proficient in reading.',
            source: 'Source: Badger Institute'
        },
        {
            question: 'Q. How did MPS respond to the COVID-19 pandemic in terms of offering in-person classes?',
            answers: [
                { text: 'A. Offered hybrid learning', correct: false },
                { text: 'B. Moved entirely online', correct: false },
                { text: 'C. Closed schools and then moved online temporarily', correct: true },
                { text: 'D. Continued in-person classes without interruptions', correct: false }
            ],
            fact: 'MPS, unlike many places, did not offer in-person classes for long stretches of time. The district closed its schools and then moved online in the spring of 2020, remained online for much of the 2020-21 school year, and returned to in-person learning for the most part in April 2021.',
            source: 'Source: Badger Institute, 2024'
        },
        {
            question: 'Q. What is the chronic absenteeism rate for Wisconsin as a whole during the 2021-22 school year?',
            answers: [
                { text: 'A. More than 5%', correct: false },
                { text: 'B. More than 10%', correct: false },
                { text: 'C. More than 20%', correct: true },
                { text: 'D. More than 25%', correct: false }
            ],
            fact: 'For Wisconsin as a whole, the chronic absenteeism rate during the 2021-22 school year was 22.8%.',
            source: 'Source: Department of Public Instruction report card, 2022'
        },
        {
            question: 'Q. How many schools in the Milwaukee Public Schools district were at less than half capacity during the 2022-2023 school year?',
            answers: [
                { text: 'A. 10', correct: false },
                { text: 'B. 20', correct: true },
                { text: 'C. 30', correct: false },
                { text: 'D. 40', correct: false }
            ],
            fact: 'There are at least 20 schools in the district that were at less than half capacity in the last school year, according to a Badger Institute analysis.',
            source: 'Source: Badger Institute, 2024'
        },
        {
            question: 'Q. What percentage of high poverty schools experienced chronic absenteeism in the 2021-22 school year nationwide?',
            answers: [
                { text: 'A. Less than 10%', correct: false },
                { text: 'B. Less than 15%', correct: false },
                { text: 'C. Less than 20%', correct: false },
                { text: 'D. More than 20%', correct: true }
            ],
            fact: 'Milwaukee Public Schools now educates 25% of all Wisconsin students (public and private) from low-income families of poverty, but only 3% of middle income children in the state. ',
            source: 'Source: University of Wisconsin-Milwaukee Employment & Training Institute, 2009' 
        },
        {
            question: 'Q. What is the primary concern expressed by school psychologist Ann Reyes regarding students return to in-person classes?',
            answers: [
                { text: 'A. Lack of academic progress', correct: false },
                { text: 'B. Difficulty in maintaining social distancing', correct: false },
                { text: 'C. Loss of social coping skills', correct: true },
                { text: 'D. Decrease in standardized test scores', correct: false }
            ],
            fact: 'Ann Reyes, a school psychologist at Madison’s East High School and an officer of the Wisconsin School Psychologists Association, notes that The pandemic allowed these students to stay at home and connect to their classes remotely online. But this allowed them to avoid social interactions, and they may have lost some ability to maintain or develop social coping skills.',
            source: 'Source: Urban Milwaukee, 2022'
        },
        {
            question: 'Q. According to Milwaukee Journal Sentinel What percentage of students at Madison High School are identified as having special education needs?',
            answers: [
                { text: 'A. More than 10%', correct: false },
                { text: 'B. More than 25%', correct: true },
                { text: 'C. Less than 5%', correct: false },
                { text: 'D. More than 15%', correct: false }
            ],
            fact: 'Another major focus of attention within the school: At 26.7%, the percentage of students with special education needs is high.',
            source: 'Source: Milwaukee Journal Sentinel, 2023'
        },
        {
            question: 'Q. What percentage of students at Madison High School were proficient or advanced in reading and language arts according to Wisconsin statewide tests in spring 2023?',
            answers: [
                { text: 'A. less than 5%', correct: true },
                { text: 'B. more than 25% ', correct: false },
                { text: 'C. more than 50%', correct: false },
                { text: 'D. more than 10%', correct: false }
            ],
            fact: 'In spring 2023, in reading and language arts, 2% of Madison High ninth- and 10th-graders were rated proficient or advanced, 13% basic and 35% below basic, while 50% didn’t take the test.',
            source: 'Source: Milwaukee Journal Sentinel, 2023'
        },
        {
            question: 'Q. According to the U.S. Department of Education, how many students across the nation were absent for 15 or more days during the academic year?',
            answers: [
                { text: 'A. 5 million', correct: false},
                { text: 'B. 2 million ', correct: false },
                { text: 'C. 7 million', correct: true },
                { text: 'D. 3 million', correct: false }
            ],
            fact: 'OVER 7 MILLION students missed 15 or more days of school in 2015-16. Thats 16 percent of the student population—or about 1 in 6 students.',
            source: 'Source: US Department of Education, 2016'
        },
        {
            question: 'Q. Among 518 students screened by the Milwaukee Health Department, how many were found likely to be depressed?',
            answers: [
                { text: 'A. More than 80 students', correct: true},
                { text: 'B. More than 20 students ', correct: false },
                { text: 'C. More than 100 students', correct: false },
                { text: 'D. More than 50 students', correct: false }
            ],
            fact: ' Among 518 students screened, 85 students (16.4%) were found likely to be depressed, and of these, 4 had emergency referrals and 12 utilized or were recommended to the free referral to the local mental health clinics.',
            source: 'Source: Milwaukee Health Department, 2003'
        },
        {
            question: 'Q. What percentage of Milwaukee Public School (MPS) students attended a school where over half of the children were poor in 2008-09?',
            answers: [
                { text: 'A. More than 80%', correct: false},
                { text: 'B. More than 25%', correct: false },
                { text: 'C. More than 50%', correct: false },
                { text: 'D. More than 90%', correct: true }
            ],
            fact: ' In the 2008-09 school year, 92% of MPS students attended schools where more than half of the students were eligible for free lunch, indicating high poverty levels.',
            source: 'Source: University of Wisconsin Milwaukee, 2009'
        },
        {
            question: 'Q. What percentage of Milwaukee children were estimated to be not in early childhood education in 2008?',
            answers: [
                { text: 'A. 8%', correct: false},
                { text: 'B. 5% ', correct: false },
                { text: 'C. 25%', correct: false },
                { text: 'D. 15%', correct: true }
            ],
            fact: 'Parents who for a variety of reasons may be keeping their children in full-time day care rather than enrolling them in early childhood education in the public and private schools.15% of Milwaukee children age 5 years old, are not in early childhood education.',
            source: 'Source: University of Wisconsin-Milwaukee Employment & Training Institute, 2009'
        },
        {
            question: 'Q. What is the state report card rating for Madison High for 2023 ',
            answers: [
                { text: 'A. 5 star', correct: false},
                { text: 'B. 1 star ', correct: false },
                { text: 'C. 4 star', correct: false },
                { text: 'D. 2 star', correct: true }
            ],
            fact: 'The DPI lists two stars as meaning the school “meets few expectations.” A year ago, Madison High got a one-star report card, carrying the label “fails to meet expectations.”',
            source: 'Source: Milwaukee Journal Sentinel, 2023'
        },
        {
            question: 'Q. What is the graduation rate within up to seven years of starting ninth grade at Madison High, according to the state report card for 2023?',
            answers: [
                { text: 'A. More than 90%', correct: false},
                { text: 'B. More than 85%', correct: false },
                { text: 'C. 100%', correct: false },
                { text: 'D. Less than 75 %', correct: true }
            ],
            fact: 'The state report card states that the graduation rate within up to seven years of starting ninth grade at Madison High is 72.1%.',
            source: 'Source: State report card, 2023'
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
        updateQuestionCount();  
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
        updateQuestionCount();
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
        timeLeft = 15;
        timerElement.innerText = `Time left: ${timeLeft}s`;
        factContainerElement.classList.remove('highlight');
        factContainerElement.classList.add('hide');
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
        stopTimer();
        showFact(shuffledQuestions[currentQuestionIndex]);
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function showFact(question) {
        factElement.innerText = question.fact;
        sourceElement.innerText = question.source;
        factContainerElement.classList.remove('hide');
        factContainerElement.classList.add('highlight'); 
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
        stopTimer();
        showFact(shuffledQuestions[currentQuestionIndex]);
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            startButton.innerText = 'Restart';
            startButton.classList.remove('hide');
        }
    }

    function updateQuestionCount() {
        const remainingQuestions = shuffledQuestions.length - currentQuestionIndex;
        questionCountElement.innerText = `Questions remaining: ${remainingQuestions}`;
    }

    function switchTheme() {
        document.body.classList.toggle('dark-theme');
    }
});
