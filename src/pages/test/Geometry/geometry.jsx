import React, { useState, useEffect } from 'react';
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
        7: [
            {
                question: "To‘g‘ri chiziq nima?",
                options: ["Cheksiz uzunlikdagi tekis chiziq", "Yopiq shakl", "Ikki nuqta orasidagi eng qisqa yo‘l", "Burchakning qirrasi"],
                correctAnswer: 0
            },
            {
                question: "Burchakning o‘lchov birligi qanday?",
                options: ["Gradus", "Santimetr", "Metrlik", "Kvadrat metr"],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda yonlar qanday bo‘ladi?",
                options: ["Barcha yonlar teng", "Faqat ikkita yon teng", "Hech qaysi yon teng emas", "Uchburchak bo‘lmaydi"],
                correctAnswer: 1
            },
            {
                question: "Kvadratning barcha tomonlari qanday bo‘ladi?",
                options: ["Teng", "Turlicha", "Faqat qarama-qarshi tomonlari teng", "Faqat diagonalari teng"],
                correctAnswer: 0
            },
            {
                question: "Doira nima?",
                options: ["Bir nuqtadan teng masofadagi barcha nuqtalar yig‘indisi", "Uchburchak turi", "To‘g‘ri chiziq segmenti", "Kvadratning shakli"],
                correctAnswer: 0
            },
            {
                question: "Kesma nima?",
                options: ["Ikki nuqta orasidagi chiziq", "Burchak", "Ko‘p burchak", "Doira radiusi"],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri burchak nechchi gradusga teng?",
                options: ["90", "45", "60", "180"],
                correctAnswer: 0
            },
            {
                question: "Paralelogramning qarama-qarshi burchaklari qanday bo‘ladi?",
                options: ["Teng", "Turlicha", "Yaltiroq", "To‘g‘ri burchak"],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda burchaklar qanday bo‘ladi?",
                options: ["Ikkita burchak teng", "Uch burchak teng", "Burchaklar turlicha", "Burchaklar doim 90°"],
                correctAnswer: 0
            },
            {
                question: "Kvadratning diagonali qanday bo‘ladi?",
                options: ["Teng", "Turlicha", "Faqat burchak ostida", "Faqat vertikal"],
                correctAnswer: 0
            }
        ],

        8: [
            {
                question: "Doiraning uzunligi qanday hisoblanadi?",
                options: ["2πr", "πr²", "πd", "r²"],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri burchakli uchburchakda Pifagor teoremasi qanday ifodalanadi?",
                options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c²"],
                correctAnswer: 0
            },
            {
                question: "Kvadratning yuzasi qanday hisoblanadi?",
                options: ["a²", "2a", "4a", "a × b"],
                correctAnswer: 0
            },
            {
                question: "Paralelogram yuzasi qanday topiladi?",
                options: ["as", "a + b", "a × b", "2a + 2b"],
                correctAnswer: 0
            },
            {
                question: "Burchaklarning yig‘indisi nechchi gradusga teng?",
                options: ["180", "90", "360", "270"],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda qanday burchaklar mavjud?",
                options: ["Ikki teng burchak", "Uch teng burchak", "Hech qanday teng burchak yo‘q", "Faqat to‘g‘ri burchak"],
                correctAnswer: 0
            },
            {
                question: "Trapetsiyaning yuzasi qanday hisoblanadi?",
                options: ["(a + b) / 2 × h", "a × h", "a + b + h", "a × b × h"],
                correctAnswer: 0
            },
            {
                question: "Radius va diametr orasidagi bog‘lanish qanday?",
                options: ["d = 2r", "r = 2d", "r = d", "d = r / 2"],
                correctAnswer: 0
            },
            {
                question: "Ichki burchaklarning yig‘indisi qaysi ko‘pburchakda 360 gradusga teng?",
                options: ["To‘rtburchak", "Uchburchak", "Beshtburchak", "Olttburchak"],
                correctAnswer: 0
            },
            {
                question: "Kvadrat va romb orasidagi farq nima?",
                options: ["Kvadratning barcha burchaklari to‘g‘ri", "Rombda barcha tomonlar teng emas", "Kvadratda diagonalalar teng emas", "Romb doim to‘g‘ri burchaklarga ega"],
                correctAnswer: 0
            }
        ],


        9: [
            {
                question: "Pifagor teoremasi qaysi uchburchak uchun amal qiladi?",
                options: ["To‘g‘ri burchakli", "Teng yonli", "Teng tomonli", "Har qanday uchburchak"],
                correctAnswer: 0
            },
            {
                question: "Doiraning yuzasi qanday hisoblanadi?",
                options: ["πr²", "2πr", "πd", "r²"],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda burchaklar qanday bo‘ladi?",
                options: ["Ikki burchak teng", "Uch burchak teng", "Hech qaysi teng emas", "Faqat bir burchak 90°"],
                correctAnswer: 0
            },
            {
                question: "Paralelogramning qarama-qarshi burchaklari qanday bo‘ladi?",
                options: ["Teng", "Turlicha", "Doim 90°", "To‘g‘ri burchak emas"],
                correctAnswer: 0
            },
            {
                question: "Trapetsiya yuzasini hisoblash formulasi qanday?",
                options: ["(a + b) / 2 × h", "a × h", "a + b + h", "a × b"],
                correctAnswer: 0
            },
            {
                question: "Kvadratning diagonalini qanday topish mumkin?",
                options: ["a√2", "2a", "a/2", "a²"],
                correctAnswer: 0
            },
            {
                question: "Ichki burchaklar yig‘indisi qanday ko‘pburchakda 540° ga teng?",
                options: ["Beshburchak", "To‘rtburchak", "Uchburchak", "Oltiburchak"],
                correctAnswer: 0
            },
            {
                question: "Rombning barcha tomonlari qanday bo‘ladi?",
                options: ["Teng", "Turlicha", "Faqat qarama-qarshi tomonlari teng", "Faqat diagonalari teng"],
                correctAnswer: 0
            },
            {
                question: "Burchakning o‘lchovi qanday o‘lchanadi?",
                options: ["Gradus", "Santimetr", "Metrlik", "Kvadrat metr"],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri burchakning o‘lchami nechchi gradus?",
                options: ["90", "45", "60", "180"],
                correctAnswer: 0
            }
        ],


        10: [
            {
                question: "Doiraning uzunligi qanday hisoblanadi?",
                options: ["2πr", "πr²", "πd", "r²"],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri burchakli uchburchakda Pifagor teoremasi qanday ifodalanadi?",
                options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c²"],
                correctAnswer: 0
            },
            {
                question: "Kvadratning yuzasi qanday hisoblanadi?",
                options: ["a²", "2a", "4a", "a × b"],
                correctAnswer: 0
            },
            {
                question: "Paralelogram yuzasi qanday topiladi?",
                options: ["as", "a + b", "a × b", "2a + 2b"],
                correctAnswer: 0
            },
            {
                question: "Burchaklarning yig‘indisi nechchi gradusga teng?",
                options: ["180", "90", "360", "270"],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda qanday burchaklar mavjud?",
                options: ["Ikki teng burchak", "Uch teng burchak", "Hech qanday teng burchak yo‘q", "Faqat to‘g‘ri burchak"],
                correctAnswer: 0
            },
            {
                question: "Trapetsiyaning yuzasi qanday hisoblanadi?",
                options: ["(a + b) / 2 × h", "a × h", "a + b + h", "a × b × h"],
                correctAnswer: 0
            },
            {
                question: "Radius va diametr orasidagi bog‘lanish qanday?",
                options: ["d = 2r", "r = 2d", "r = d", "d = r / 2"],
                correctAnswer: 0
            },
            {
                question: "Ichki burchaklarning yig‘indisi qaysi ko‘pburchakda 360 gradusga teng?",
                options: ["To‘rtburchak", "Uchburchak", "Beshtburchak", "Olttburchak"],
                correctAnswer: 0
            },
            {
                question: "Kvadrat va romb orasidagi farq nima?",
                options: ["Kvadratning barcha burchaklari to‘g‘ri", "Rombda barcha tomonlar teng emas", "Kvadratda diagonalalar teng emas", "Romb doim to‘g‘ri burchaklarga ega"],
                correctAnswer: 0
            }
        ],


        11: [
            {
                question: "Vektorlarning skalyar ko‘paytmasi nima?",
                options: [
                    "Vektorlar uzunligi yig‘indisi",
                    "Vektorlarning modul ko‘paytmasi va burchak kosinusi",
                    "Vektorlarning koordinatalari yig‘indisi",
                    "Vektorlarning burchak yig‘indisi"
                ],
                correctAnswer: 1
            },
            {
                question: "To‘g‘ri chiziq tenglamasi qanday yoziladi?",
                options: [
                    "y = kx + b",
                    "ax + by + c = 0",
                    "y = mx",
                    "x + y = 0"
                ],
                correctAnswer: 1
            },
            {
                question: "Tenglama ax + by + c = 0 qanday to‘g‘ri chiziqni ifodalaydi?",
                options: [
                    "Gorizontal chiziq",
                    "Vertikal chiziq",
                    "Har qanday to‘g‘ri chiziq",
                    "Faqat burchak ostidagi chiziq"
                ],
                correctAnswer: 2
            },
            {
                question: "Kvadratning diagonallari qanday bo‘ladi?",
                options: [
                    "Teng va perpendikulyar",
                    "Teng emas va parallel",
                    "Perpendikulyar emas",
                    "Turlicha uzunlikda"
                ],
                correctAnswer: 0
            },
            {
                question: "Teng yonli uchburchakda burchaklar qanday bo‘ladi?",
                options: [
                    "Ikkita teng burchak",
                    "Uch burchak teng",
                    "Burchaklar turlicha",
                    "Faqat bir burchak 90°"
                ],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri burchakli uchburchakda gipotenuza uzunligi qanday topiladi?",
                options: [
                    "a² + b²",
                    "√(a² + b²)",
                    "a + b",
                    "a - b"
                ],
                correctAnswer: 1
            },
            {
                question: "Trapetsiyaning yuzasi qanday hisoblanadi?",
                options: [
                    "(a + b) / 2 × h",
                    "a × h",
                    "a + b + h",
                    "a × b"
                ],
                correctAnswer: 0
            },
            {
                question: "Vektor koordinatalari qanday belgilanadi?",
                options: [
                    "(x, y, z)",
                    "(a, b, c)",
                    "(m, n, p)",
                    "(u, v, w)"
                ],
                correctAnswer: 0
            },
            {
                question: "Ichki burchaklarning yig‘indisi qaysi ko‘pburchakda 720° ga teng?",
                options: [
                    "Oltiburchak",
                    "Beshtburchak",
                    "To‘rtburchak",
                    "Yettiburchak"
                ],
                correctAnswer: 0
            },
            {
                question: "To‘g‘ri chiziq va tekislik o‘rtasidagi burchak qanday o‘lchanadi?",
                options: [
                    "Gradusda",
                    "Santimetrda",
                    "Metrlikda",
                    "Kvadrat metrda"
                ],
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
                    <h1>GhostIQ - Geometry Testi</h1>
                </header>

                {!grade ? (
                    <div className="grade-selection">
                        <h2>Sinfingizni tanlang:</h2>
                        <div className="grade-buttons">
                            {[7, 8, 9, 10, 11].map((g) => (
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