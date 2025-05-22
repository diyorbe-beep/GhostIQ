import React, { useState, useEffect } from 'react';
import './Math.scss';
import Navbar from '../../../components/navbar/navbar';

const GhostIQMathTest = () => {
    const [grade, setGrade] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    // Har bir sinf uchun test savollari
    const gradeQuestions = {
        5: [
            {
                question: "24 ni 3 ga bo'lganda qanday javob chiqadi?",
                options: ["6", "7", "8", "9"],
                correctAnswer: 2
            },
            {
                question: "Quyidagi sonlardan qaysi biri juft son?",
                options: ["11", "15", "18", "23"],
                correctAnswer: 2
            },
            {
                question: "25 + 37 nechchi?",
                options: ["52", "62", "18", "72"],
                correctAnswer: 1
            },
            {
                question: "48 - 19 nechchi?",
                options: ["29", "62", "27", "31"],
                correctAnswer: 0
            },
            {
                question: "56 ÷ 8 nechchi?",
                options: ["7", "9", "12", "8"],
                correctAnswer: 3
            },
            {
                question: "7 × 6 nechchi?",
                options: ["42", "36", "48", "35"],
                correctAnswer: 0
            },
            {
                question: "40 va 25 sonlarining yig‘indisi nechchi?",
                options: ["42", "65", "70", "55"],
                correctAnswer: 1
            },
            {
                question: "9 va 4 sonlarini qo‘shing.",
                options: ["13", "18", "19", "14"],
                correctAnswer: 0
            },
            {
                question: "100 dan 45 ni ayiring.",
                options: ["55", "18", "65", "78"],
                correctAnswer: 2
            },
            {
                question: "30 va 20 sonlarining ayirmasi nechchi?",
                options: ["40", "18", "50", "10"],
                correctAnswer: 3
            }
        ],
        6: [
            {
                question: "12.5 + 7.5 ning yig'indisi qancha?",
                options: ["19", "20", "19.5", "20.5"],
                correctAnswer: 2
            },
            {
                question: "1 km qancha metr?",
                options: ["10", "100", "1000", "10000"],
                correctAnswer: 2
            },
            {
                question: "125 + 376 nechchi?",
                options: ["401", "501", "491"],
                correctAnswer: 2
            },
            {
                question: "84 - 37 nechchi?",
                options: ["47", "57", "67"],
                correctAnswer: 1
            },
            {
                question: "12 × 8 nechchi?",
                options: ["96", "86", "106"],
                correctAnswer: 0
            },
            {
                question: "144 ÷ 12 nechchi?",
                options: ["12", "11", "10"],
                correctAnswer: 0
            },
            {
                question: "15 ning 4 barobarini toping.",
                options: ["60", "45", "50"],
                correctAnswer: 0
            },
            {
                question: "7 × (5 + 3) nechchi?",
                options: ["56", "48", "60"],
                correctAnswer: 0
            }
        ],

        7: [
            {
                question: "48 ÷ 6 nechchi?",
                options: ["6", "7", "8", "9"],
                correctAnswer: 2
            },
            {
                question: "15 × 9 nechchi?",
                options: ["135", "145", "125"],
                correctAnswer: 0
            },
            {
                question: "125 + 375 nechchi?",
                options: ["400", "500", "600"],
                correctAnswer: 1
            },
            {
                question: "36 % 12 ning natijasi nima?",
                options: ["2", "3", "4"],
                correctAnswer: 1
            },
            {
                question: "2^3 (2 darajasi 3) nechchi?",
                options: ["6", "8", "9"],
                correctAnswer: 1
            },
            {
                question: "30 ni 5 ga bo‘ling.",
                options: ["5", "6", "7"],
                correctAnswer: 1
            },
            {
                question: "40 - 18 nechchi?",
                options: ["22", "23", "24"],
                correctAnswer: 0
            },
            {
                question: "7 × (4 + 6) nechchi?",
                options: ["60", "70", "80"],
                correctAnswer: 1
            }
        ],

        8: [
            {
                question: "256 ÷ 8 nechchi?",
                options: ["28", "32", "34"],
                correctAnswer: 1
            },
            {
                question: "45 × 12 nechchi?",
                options: ["540", "550", "560"],
                correctAnswer: 0
            },
            {
                question: "1000 dan 375 ni ayiring.",
                options: ["625", "635", "645"],
                correctAnswer: 0
            },
            {
                question: "3^4 nechchi?",
                options: ["81", "64", "27"],
                correctAnswer: 0
            },
            {
                question: "60 ning 25% nechchi?",
                options: ["12", "15", "18"],
                correctAnswer: 0
            },
            {
                question: "7 × (5 + 9) nechchi?",
                options: ["84", "98", "102"],
                correctAnswer: 0
            },
            {
                question: "144 ÷ 12 nechchi?",
                options: ["10", "11", "12"],
                correctAnswer: 2
            },
            {
                question: "18 ning 3 barobari nechchi?",
                options: ["54", "48", "45"],
                correctAnswer: 0
            }
        ],

        9: [
            {
                question: "144 ning kvadrat ildizi nechchi?",
                options: ["12", "14", "16"],
                correctAnswer: 0
            },
            {
                question: "25 % ning 200 ga tengligi nechchi?",
                options: ["50", "45", "55"],
                correctAnswer: 0
            },
            {
                question: "x + 5 = 12 bo‘lsa, x nechchi?",
                options: ["7", "8", "6"],
                correctAnswer: 0
            },
            {
                question: "2x = 16 bo‘lsa, x nechchi?",
                options: ["6", "8", "10"],
                correctAnswer: 1
            },
            {
                question: "3^3 nechchi?",
                options: ["27", "18", "9"],
                correctAnswer: 0
            },
            {
                question: "36 ÷ 6 × 3 nechchi?",
                options: ["12", "18", "24"],
                correctAnswer: 1
            },
            {
                question: "12 ning 1/4 qismi nechchi?",
                options: ["2", "3", "4"],
                correctAnswer: 1
            },
            {
                question: "5 × (6 + 4) nechchi?",
                options: ["45", "50", "55"],
                correctAnswer: 1
            }
        ],

        10: [
            {
                question: "log₁₀ 100 nechchi?",
                options: ["1", "2", "3"],
                correctAnswer: 1
            },
            {
                question: "sin 30° ning qiymati nechchi?",
                options: ["1/2", "√2/2", "√3/2"],
                correctAnswer: 0
            },
            {
                question: "2x² = 18 bo‘lsa, x nechchi?",
                options: ["3", "4", "2"],
                correctAnswer: 0
            },
            {
                question: "Differensial hisoblash nima uchun kerak?",
                options: ["Funksiyaning o‘zgarishini aniqlash", "Sonlarni qo‘shish", "Sonlarni ayirish"],
                correctAnswer: 0
            },
            {
                question: "ln e nechchi?",
                options: ["0", "1", "e"],
                correctAnswer: 1
            },
            {
                question: "cos 60° ning qiymati nechchi?",
                options: ["1/2", "1", "0"],
                correctAnswer: 0
            },
            {
                question: "3x + 5 = 20 bo‘lsa, x nechchi?",
                options: ["5", "4", "6"],
                correctAnswer: 1
            },
            {
                question: "Integral nima?",
                options: ["Maydonni hisoblash", "Sonni ko‘paytirish", "Sonni bo‘lish"],
                correctAnswer: 0
            }
        ],

        11: [
            {
                question: "x² - 4 = 0 tenglama yechimi nechchi?",
                options: ["±2", "±4", "±1"],
                correctAnswer: 0
            },
            {
                question: "log₂ 8 nechchi?",
                options: ["2", "3", "4"],
                correctAnswer: 1
            },
            {
                question: "sin 45° ning qiymati nechchi?",
                options: ["√2/2", "1/2", "√3/2"],
                correctAnswer: 0
            },
            {
                question: "Derivativ nima?",
                options: ["Funksiyaning o‘zgarish tezligi", "Funksiyaning qiymati", "Sonning ko‘paytmasi"],
                correctAnswer: 0
            },
            {
                question: "Integralning asosiy qoidasi nima?",
                options: ["Derivativni qaytaradi", "Sonlarni qo‘shadi", "Sonlarni ayiradi"],
                correctAnswer: 0
            },
            {
                question: "2x + 3 = 7 bo‘lsa, x nechchi?",
                options: ["2", "3", "4"],
                correctAnswer: 0
            },
            {
                question: "√49 nechchi?",
                options: ["7", "8", "9"],
                correctAnswer: 0
            },
            {
                question: "log₁₀ 1 nechchi?",
                options: ["0", "1", "10"],
                correctAnswer: 0
            }
        ],

    };

    // Sinfni tanlash
    const handleGradeSelect = (selectedGrade) => {
        setGrade(selectedGrade);
        const gradeQs = gradeQuestions[selectedGrade];
        // Savollarni aralashtirish
        const shuffled = [...gradeQs].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
        setQuestions(gradeQs);
    };

    const handleOptionSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleNextQuestion = () => {
        if (selectedOption === shuffledQuestions[currentQuestion].correctAnswer) {
            setScore(score + 1);
        }

        setSelectedOption(null);
        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const restartTest = () => {
        setGrade(null);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
    };

    return (
        <div className="wrapper">
            <Navbar />
            <div className="ghostiq-container">
                <header className="app-header">
                    <h1>GhostIQ - Matematika Testi</h1>
                </header>

                {!grade ? (
                    <div className="grade-selection">
                        <h2>Sinfingizni tanlang:</h2>
                        <div className="grade-buttons">
                            {[5, 6, 7, 8, 9, 10, 11].map((g) => (
                                <button
                                    key={g}
                                    className="grade-btn"
                                    onClick={() => handleGradeSelect(g)}
                                >
                                    {g}-sinf
                                </button>
                            ))}
                        </div>
                    </div>
                ) : showScore ? (
                    <div className="score-section">
                        <h2>Test yakunlandi!</h2>
                        <p>
                            Siz {shuffledQuestions.length} savoldan {score} tasiga to'g'ri javob berdingiz.
                            ({Math.round((score / shuffledQuestions.length) * 100)}%)
                        </p>
                        <button onClick={restartTest} className="restart-btn">
                            Bosh menyuga qaytish
                        </button>
                    </div>
                ) : (
                    <div className="question-section">
                        <div className="question-info">
                            <span className="grade-info">{grade}-sinf</span>
                            <span className="question-count">
                                Savol {currentQuestion + 1}/{shuffledQuestions.length}
                            </span>
                        </div>
                        <div className="question-text">
                            {shuffledQuestions[currentQuestion].question}
                        </div>
                        <div className="options-section">
                            {shuffledQuestions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`option-btn ${selectedOption === index ? "selected" : ""
                                        }`}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    {String.fromCharCode(65 + index)}) {option}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleNextQuestion}
                            className="next-btn"
                            disabled={selectedOption === null}
                        >
                            {currentQuestion === shuffledQuestions.length - 1 ? "Yakunlash" : "Keyingi savol"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GhostIQMathTest;