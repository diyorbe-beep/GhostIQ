import React, { useState, useEffect } from 'react';
import './OnaTili.scss';
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
                question: "Quyidagilardan qaysi biri ot turkumiga mansub emas?",
                options: ["kitob", "daraxt", "o'qish", "uy"],
                correctAnswer: 2
            },
            {
                question: "To‘g‘ri yozilgan so‘zni toping:",
                options: ["hayajon", "xayajon", "hayyajon", "xayyajon"],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘z fe‘lga misol bo‘ladi?",
                options: ["yugurmoq", "kitob", "oq", "tez"],
                correctAnswer: 0
            },
            {
                question: "So‘zlarni to‘g‘ri tartibda joylashtiring: 'men / maktabga / boraman'",
                options: ["men boraman maktabga", "boraman men maktabga", "maktabga boraman men", "men maktabga boraman"],
                correctAnswer: 3
            },
            {
                question: "Qaysi so‘z ot emas?",
                options: ["qalam", "sinf", "chiroyli", "o‘quvchi"],
                correctAnswer: 2
            },
            {
                question: "Sifatni toping:",
                options: ["ko‘k", "o‘qimoq", "kitob", "bola"],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘z fe‘l emas?",
                options: ["yashamoq", "yozmoq", "bola", "o‘qimoq"],
                correctAnswer: 2
            },
            {
                question: "Qaysi so‘z sifatga misol bo‘ladi?",
                options: ["kattalik", "katta", "katta-qo‘rg‘on", "katta bo‘ldi"],
                correctAnswer: 1
            },
            {
                question: "Gapdagi otni toping: 'O‘quvchi dars qilyapti'",
                options: ["O‘quvchi", "dars", "qilyapti", "va"],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘zda imlo xatosi bor?",
                options: ["maktab", "defter", "qalam", "o‘qituvchi"],
                correctAnswer: 1
            }
        ],
        6: [
            {
                question: "“Men maktabga ketdim” gapida nechta so‘z bor?",
                options: ["3", "4", "5", "2"],
                correctAnswer: 1
            },
            {
                question: "Fe’lning nechta zamoni bor?",
                options: ["1", "2", "3", "4"],
                correctAnswer: 2
            },
            {
                question: "“Toshkent – O‘zbekiston poytaxti.” – bu qanday gap?",
                options: ["Buyruq gap", "So‘roq gap", "Hikoya gap", "Hayajon gap"],
                correctAnswer: 2
            },
            {
                question: "Qaysi juft so‘z sinonim emas?",
                options: ["katta – ulkan", "chiroyli – go‘zal", "tez – sust", "aqlli – dono"],
                correctAnswer: 2
            },
            {
                question: "“U o‘qituvchini ko‘rdi” – bu qanday gap?",
                options: ["Bo‘lakli", "Bo‘laksiz", "Tushum keltirilgan", "Egasi yo‘q"],
                correctAnswer: 2
            },
            {
                question: "“Shirinlik” so‘zida nechta qo‘shimcha bor?",
                options: ["1", "2", "3", "0"],
                correctAnswer: 1
            },
            {
                question: "Otlar nechta turga bo‘linadi?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 0
            },
            {
                question: "“U kitob o‘qiyapti” gapida fe’lning zamoni qanday?",
                options: ["Hozirgi", "O‘tgan", "Kelasi", "Buyruq"],
                correctAnswer: 0
            },
            {
                question: "“Yozuvchi” so‘zi qanday yasalgan?",
                options: ["Ot + qo‘shimcha", "Fe’l + qo‘shimcha", "Sifat + qo‘shimcha", "Son + qo‘shimcha"],
                correctAnswer: 1
            },
            {
                question: "Qaysi so‘zlar jufti antonimdir?",
                options: ["yaxshi – go‘zal", "keng – tor", "tez – chaqqon", "katta – ulkan"],
                correctAnswer: 1
            }
        ],
        7: [
            {
                question: "Qaysi gapda sifatdosh bor?",
                options: [
                    "U o‘qishni yaxshi ko‘radi",
                    "Kitob stol ustida turibdi",
                    "Qizil rang chiroyli ko‘rinadi",
                    "Men maktabga ketdim"
                ],
                correctAnswer: 2
            },
            {
                question: "“O‘qituvchi dars berdi” gapida fe’l qanday zamonda?",
                options: ["Hozirgi", "O‘tgan", "Kelasi", "Buyruq"],
                correctAnswer: 1
            },
            {
                question: "Sinonim juftini toping:",
                options: [
                    "katta – kichik",
                    "tez – sekin",
                    "yaxshi – zo‘r",
                    "oq – qora"
                ],
                correctAnswer: 2
            },
            {
                question: "“O‘qib bitgan kitobni qaytardi” gapida qanday so‘z birikmasi bor?",
                options: [
                    "Fe’l sifatdoshi",
                    "Fe’l qo‘shimchasi",
                    "Sifatdosh",
                    "Qo‘shimcha"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda undov bor?",
                options: [
                    "Ey do‘st, kel bizga!",
                    "Kitob stol ustida turadi",
                    "U maktabga ketdi",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "“Chiroyli gullar bog‘da” gapida qanday so‘z turi ko‘proq?",
                options: [
                    "Ot",
                    "Fe’l",
                    "Sifat",
                    "Undov"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘zda qo‘shimcha bor?",
                options: [
                    "Kitoblar",
                    "Yozuv",
                    "Uy",
                    "Bog‘"
                ],
                correctAnswer: 0
            },
            {
                question: "“Men kitob o‘qidim” gapida nechta so‘z bor?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1
            },
            {
                question: "Qaysi gapda so‘zning ma’nosi kengaytirilgan?",
                options: [
                    "Mening qalbim ochiq",
                    "Uy qalin devorlar bilan qurilgan",
                    "U maktabga ketdi",
                    "Bugun yomg‘ir yog‘moqda"
                ],
                correctAnswer: 0
            },
            {
                question: "“Kitobni stol ustiga qo‘ying” gapida qanday kelishik ishlatilgan?",
                options: [
                    "Iloji kelishik",
                    "O‘rinlik kelishik",
                    "Jo‘nalish kelishik",
                    "Toshkent kelishik"
                ],
                correctAnswer: 2
            }
        ],
        8: [
            {
                question: "Qaysi so‘z turkumiga qarang: “tezlik”?",
                options: ["Ot", "Fe’l", "Sifat", "Sifatdosh"],
                correctAnswer: 0
            },
            {
                question: "“Yugurib kel” gapida nechta fe’l bor?",
                options: ["1", "2", "3", "0"],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda so‘z o‘rinbosarlik qilmoqda?",
                options: [
                    "Men maktabga bordim",
                    "Bu yaxshi kitob",
                    "U ko‘rdi va mamnun bo‘ldi",
                    "U kitobni oldi"
                ],
                correctAnswer: 3
            },
            {
                question: "Fe’l qanday so‘z turkumidir?",
                options: [
                    "Harakat bildiruvchi so‘z",
                    "Buyum nomi",
                    "Tavsif bildiruvchi so‘z",
                    "Bog‘lovchi so‘z"
                ],
                correctAnswer: 0
            },
            {
                question: "“Chiroyli gullar” gapida nechta sifat bor?",
                options: ["1", "2", "3", "0"],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda ko‘plik qo‘shimchasi ishlatilgan?",
                options: [
                    "Kitoblar stol ustida",
                    "U yaxshi o‘qiydi",
                    "Uy katta",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "“Uyga kirib keldingmi?” gapida qanday savol turadi?",
                options: [
                    "Yo‘q-yo‘q",
                    "Savol",
                    "Buyruq",
                    "Undov"
                ],
                correctAnswer: 1
            },
            {
                question: "“Yozuvchi” so‘zi qanday yasalgan?",
                options: [
                    "Ot + qo‘shimcha",
                    "Fe’l + qo‘shimcha",
                    "Sifat + qo‘shimcha",
                    "Son + qo‘shimcha"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi so‘zlarda fe’l mavjud?",
                options: [
                    "Yugurdi, keldi, o‘qiydi",
                    "Kitob, daftarchi, daftar",
                    "Chiroyli, katta, kichik",
                    "Men, sen, ular"
                ],
                correctAnswer: 0
            },
            {
                question: "“U kitob o‘qidi” gapida qanday kelishik ishlatilgan?",
                options: [
                    "Iloji kelishik",
                    "O‘rinlik kelishik",
                    "Jo‘nalish kelishik",
                    "Boshqaruv kelishik"
                ],
                correctAnswer: 3
            }
        ],
        9: [
            {
                question: "Qaysi so‘zlarda sinonim mavjud?",
                options: [
                    "Chiroyli – go‘zal",
                    "Katta – kichik",
                    "Yaxshi – yomon",
                    "Oq – qora"
                ],
                correctAnswer: 0
            },
            {
                question: "“Kitob stol ustida” gapida qanday so‘z turi ko‘proq?",
                options: [
                    "Ot",
                    "Fe’l",
                    "Sifat",
                    "Undov"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda so‘zning ma’nosi kengaytirilgan?",
                options: [
                    "U ko‘p ishlaydi",
                    "Mening yuragim shirin",
                    "Bugun ob-havo yaxshi",
                    "Men maktabga bordim"
                ],
                correctAnswer: 1
            },
            {
                question: "“Yaxshi” va “yomon” so‘zlari qanday juftlik?",
                options: [
                    "Sinonim",
                    "Antonim",
                    "Homofon",
                    "Homograf"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi gapda so‘zlar to‘g‘ri kelishikda?",
                options: [
                    "Men kitobni o‘qidim",
                    "U maktabga ketdi",
                    "Kitob stol ustida",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘zda qo‘shimcha yo‘q?",
                options: [
                    "Kitoblar",
                    "Uy",
                    "Bog‘cha",
                    "Yozuv"
                ],
                correctAnswer: 1
            },
            {
                question: "“Men kitob o‘qidim” gapida fe’l qanday zamonda?",
                options: [
                    "Hozirgi",
                    "O‘tgan",
                    "Kelasi",
                    "Buyruq"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi so‘z ot emas?",
                options: [
                    "Uy",
                    "Kitob",
                    "Yugurdi",
                    "Daraxt"
                ],
                correctAnswer: 2
            },
            {
                question: "Qaysi gapda undov bor?",
                options: [
                    "Ey do‘st, kel!",
                    "U maktabga ketdi",
                    "Men o‘qidim",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "“Chiroyli gullar” gapida nechta sifat bor?",
                options: [
                    "1",
                    "2",
                    "3",
                    "0"
                ],
                correctAnswer: 0
            }
        ],
        10: [
            {
                question: "Fe’l qanday so‘z turkumidir?",
                options: [
                    "Harakat bildiruvchi so‘z",
                    "Buyum nomi",
                    "Tavsif bildiruvchi so‘z",
                    "Bog‘lovchi so‘z"
                ],
                correctAnswer: 0
            },
            {
                question: "Sinonim nima?",
                options: [
                    "Bir xil ma’noli so‘z",
                    "Teskari ma’noli so‘z",
                    "So‘z shakli",
                    "Yangi so‘z"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda so‘z o‘rinbosari ishlatilgan?",
                options: [
                    "U o‘qiyapti",
                    "Kitoblar stol ustida",
                    "Bu yaxshi kitob",
                    "U keladi"
                ],
                correctAnswer: 2
            },
            {
                question: "“O‘qib bitgan kitob” gapida qanday so‘z birikmasi bor?",
                options: [
                    "Fe’l sifatdoshi",
                    "Fe’l qo‘shimchasi",
                    "Sifatdosh",
                    "Qo‘shimcha"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi so‘zda qo‘shimcha yo‘q?",
                options: [
                    "Kitoblar",
                    "Uy",
                    "Bog‘cha",
                    "Yozuv"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi gapda ma’nodosh so‘zlar bor?",
                options: [
                    "Katta – ulkan",
                    "Yaxshi – yomon",
                    "Tez – sust",
                    "Yorqin – quyuq"
                ],
                correctAnswer: 0
            },
            {
                question: "“U maktabga ketdi” gapida qanday kelishik ishlatilgan?",
                options: [
                    "Jo‘nalish kelishik",
                    "O‘rinlik kelishik",
                    "Iloji kelishik",
                    "Toshkent kelishik"
                ],
                correctAnswer: 0
            },
            {
                question: "“Yozuvchi” so‘zi qanday yasalgan?",
                options: [
                    "Ot + qo‘shimcha",
                    "Fe’l + qo‘shimcha",
                    "Sifat + qo‘shimcha",
                    "Son + qo‘shimcha"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi so‘zlar jufti antonimdir?",
                options: [
                    "yaxshi – go‘zal",
                    "keng – tor",
                    "tez – chaqqon",
                    "katta – ulkan"
                ],
                correctAnswer: 1
            },
            {
                question: "“U kitobni o‘qidi” gapida nechta so‘z bor?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1
            }
        ],
        11: [
            {
                question: "Sinonim so‘z nima?",
                options: [
                    "Bir xil ma’noli so‘z",
                    "Teskari ma’noli so‘z",
                    "Yangi so‘z",
                    "So‘z shakli"
                ],
                correctAnswer: 0
            },
            {
                question: "Antonim so‘z qanday ma’noni bildiradi?",
                options: [
                    "Bir xil ma’noli",
                    "Teskari ma’noli",
                    "O‘xshash ma’noli",
                    "Yangi so‘z"
                ],
                correctAnswer: 1
            },
            {
                question: "Fe’lning nechta zamoni bor?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 1
            },
            {
                question: "“O‘qib bitgan kitob” gapida qanday so‘z birikmasi bor?",
                options: [
                    "Fe’l sifatdoshi",
                    "Fe’l qo‘shimchasi",
                    "Sifatdosh",
                    "Qo‘shimcha"
                ],
                correctAnswer: 0
            },
            {
                question: "Qaysi gapda undov bor?",
                options: [
                    "Ey do‘st, kel!",
                    "U maktabga ketdi",
                    "Men o‘qidim",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "“Yaxshi” va “yomon” so‘zlari qanday juftlik?",
                options: [
                    "Sinonim",
                    "Antonim",
                    "Homofon",
                    "Homograf"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi gapda so‘zlar to‘g‘ri kelishikda?",
                options: [
                    "Men kitobni o‘qidim",
                    "U maktabga ketdi",
                    "Kitob stol ustida",
                    "Bola o‘ynayapti"
                ],
                correctAnswer: 0
            },
            {
                question: "“Kitob” so‘zining sinonimi qaysi?",
                options: [
                    "Darslik",
                    "Daftar",
                    "O‘quv qo‘llanma",
                    "Barcha javoblar to‘g‘ri"
                ],
                correctAnswer: 3
            },
            {
                question: "Qaysi gapda fe’l ko‘plik shaklida?",
                options: [
                    "Men o‘qiyman",
                    "Ular ketishdi",
                    "U o‘qiydi",
                    "Biz keldik"
                ],
                correctAnswer: 1
            },
            {
                question: "Qaysi gapda so‘zlar ma’nosi kengaytirilgan?",
                options: [
                    "Mening yuragim ochiq",
                    "Uy katta",
                    "U maktabga ketdi",
                    "Bugun yomg‘ir yog‘moqda"
                ],
                correctAnswer: 0
            }
        ]

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
                    <h1>GhostIQ - Ona tili test</h1>
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