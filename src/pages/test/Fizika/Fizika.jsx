import React, { useState, useEffect } from 'react';
import './Fizika.scss';
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
                question: "Fizika fani nimani o‘rganadi?",
                options: ["Hayvonlar", "Jism va tabiat hodisalari", "O‘simliklar", "Shaharlar"],
                correctAnswer: 1
            },
            {
                question: "Modda qanday holatlarda bo‘ladi?",
                options: ["Qattiq, suyuq, gaz", "Qattiq, suyuq, plazma", "Gaz, suyuq, bug‘", "Suyuqlik, bug‘, plazma"],
                correctAnswer: 2
            },
            {
                question: "Qattiq jismlarning xususiyati nima?",
                options: ["Shakli o‘zgaradi", "Doim suyuq bo‘ladi", "Shakli o‘zgarmaydi", "Uchadi"],
                correctAnswer: 2
            },
            {
                question: "Suyuqliklar qanday idishga solinsa, shunday ...?",
                options: ["Uchadi", "Soviydi", "Qaytaydi", "Shakl oladi"],
                correctAnswer: 3
            },
            {
                question: "Havo bu — ...",
                options: ["Modda", "Energiyaga ega", "Bo‘shliq", "Tog‘"],
                correctAnswer: 0
            },
            {
                question: "Quyoshdan yerga issiqlik qanday yetib keladi?",
                options: ["Tebranish bilan", "Oqim bilan", "Nurlanish bilan", "Havo orqali"],
                correctAnswer: 2
            },
            {
                question: "Magnit qaysi narsalarni tortadi?",
                options: ["Plastmassa", "Temir", "Yog‘och", "Shisha"],
                correctAnswer: 1
            },
            {
                question: "Issiqlik nima bilan o‘lchanadi?",
                options: ["Gramm", "Joul", "Metr", "Sekund"],
                correctAnswer: 1
            },
            {
                question: "Haroratni nima bilan o‘lchaymiz?",
                options: ["Termometr", "Tarozi", "Lineyka", "Kompas"],
                correctAnswer: 0
            },
            {
                question: "Elektr toki nimadan oqadi?",
                options: ["Plastmassa", "Havo", "Metall", "Yog‘och"],
                correctAnswer: 2
            }
        ],
        6: [
            {
                question: "Nur qaysi tezlikda harakatlanadi?",
                options: ["300 000 km/s", "150 000 km/s", "100 000 km/s", "200 000 km/s"],
                correctAnswer: 0
            },
            {
                question: "Harakat tezligi nimani bildiradi?",
                options: ["Masofa va vaqt nisbati", "Og‘irlik", "Massa", "Kuch"],
                correctAnswer: 0
            },
            {
                question: "Gravitatsiya kuchi qaysi jismlarga ta'sir qiladi?",
                options: ["Faqat erkin tushayotgan jismlarga", "Faqat harakatdagi jismlarga", "Barcha jismlarga", "Faqat yirik jismlarga"],
                correctAnswer: 2
            },
            {
                question: "Jismning massasini o‘lchashda qanday birlik ishlatiladi?",
                options: ["Kilogramm", "Metr", "Soniya", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Elektr toki nima?",
                options: ["Elektr zaryadlarining harakati", "Issiqlik energiyasi", "Yorug‘lik", "Kuch"],
                correctAnswer: 0
            },
            {
                question: "Qaysi modda elektr toki o'tkazmaydi?",
                options: ["Izolyator", "Metall", "Suv", "Grafit"],
                correctAnswer: 0
            },
            {
                question: "Jismning tezligi qanday o‘lchanadi?",
                options: ["Metr/sekund", "Kilogramm", "Neyton", "Vatt"],
                correctAnswer: 0
            },
            {
                question: "Qaysi kuch harakatni o‘zgartiradi?",
                options: ["Gravitatsiya kuchi", "Harakat kuchi", "Kuchlanish", "Yuklama kuchi"],
                correctAnswer: 0
            },
            {
                question: "Issiqlik energiyasi nimadan hosil bo‘ladi?",
                options: ["Molekulalarning harakati", "Massa", "Hajm", "Suv"],
                correctAnswer: 0
            },
            {
                question: "Oddiy mexanik kuch o‘lchovi qanday birlikda ifodalanadi?",
                options: ["Neyton", "Joul", "Volt", "Amper"],
                correctAnswer: 0
            }
        ],

        7: [
            {
                question: "Qaysi birlikda kuch o‘lchanadi?",
                options: ["Neyton", "Joul", "Volt", "Amper"],
                correctAnswer: 0
            },
            {
                question: "Harakatlanayotgan jismlarning harakat tezligini qanday o‘lchashadi?",
                options: ["Metr/sekund", "Kilogramm", "Sekund", "Vatt"],
                correctAnswer: 0
            },
            {
                question: "Qaysi kuch jismlarni erga tortadi?",
                options: ["Gravitatsiya kuchi", "Magnit kuchi", "Elektr kuchi", "Aerodinamik kuch"],
                correctAnswer: 0
            },
            {
                question: "Qaysi modda elektr tokini yaxshi o'tkazadi?",
                options: ["Metall", "Plastmassa", "Shisha", "Yog‘och"],
                correctAnswer: 0
            },
            {
                question: "Issiqlik energiyasi nimadan kelib chiqadi?",
                options: ["Molekulalarning harakati", "Jismning hajmi", "Og‘irlik", "Massa"],
                correctAnswer: 0
            },
            {
                question: "Nur qanday tezlikda harakatlanadi?",
                options: ["300 000 km/s", "150 000 km/s", "100 000 km/s", "200 000 km/s"],
                correctAnswer: 0
            },
            {
                question: "Elektr tokining kuchi qanday o‘lchanadi?",
                options: ["Amper", "Volt", "Neyton", "Joul"],
                correctAnswer: 0
            },
            {
                question: "Harorat qanday o‘lchanadi?",
                options: ["Selsiy darajasi", "Metr", "Sekund", "Kilogramm"],
                correctAnswer: 0
            },
            {
                question: "Massa qanday o‘lchanadi?",
                options: ["Kilogramm", "Metr", "Sekund", "Amper"],
                correctAnswer: 0
            },
            {
                question: "Qaysi modda issiqlikni yaxshi o'tkazadi?",
                options: ["Metall", "Shisha", "Plastmassa", "Yog‘och"],
                correctAnswer: 0
            }
        ],

        8: [
            {
                question: "Harakatning tezligi nima bilan o‘lchanadi?",
                options: ["Metr/sekund", "Kilogramm", "Sekund", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Qaysi kuch jismlarning harakat yo‘nalishini o‘zgartiradi?",
                options: ["Markazga yo‘naltirilgan kuch", "Gravitatsiya kuchi", "Magnit kuchi", "Elektr kuchi"],
                correctAnswer: 0
            },
            {
                question: "Nur qanday harakatlanadi?",
                options: ["To‘g‘ri chiziqda", "Aylanada", "To‘lqinda", "To‘lqinlarda"],
                correctAnswer: 0
            },
            {
                question: "Issiqlik energiyasi nimadan hosil bo‘ladi?",
                options: ["Molekulalarning harakati", "Massa", "Og‘irlik", "Yuqori harorat"],
                correctAnswer: 0
            },
            {
                question: "Qaysi birlikda ish kuchi o‘lchanadi?",
                options: ["Joul", "Neyton", "Volt", "Amper"],
                correctAnswer: 0
            },
            {
                question: "Elektr toki kuchi qanday o‘lchanadi?",
                options: ["Amper", "Volt", "Joul", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Massa qanday o‘lchanadi?",
                options: ["Kilogramm", "Metr", "Sekund", "Volt"],
                correctAnswer: 0
            },
            {
                question: "Harorat qanday o‘lchanadi?",
                options: ["Selsiy darajasi", "Kelvin", "Metr", "Sekund"],
                correctAnswer: 0
            },
            {
                question: "Qaysi modda elektr tokini yaxshi o'tkazadi?",
                options: ["Metall", "Shisha", "Plastmassa", "Yog‘och"],
                correctAnswer: 0
            },
            {
                question: "Qaysi kuch jismlarni erga tortadi?",
                options: ["Gravitatsiya kuchi", "Magnit kuchi", "Elektr kuchi", "Aerodinamik kuch"],
                correctAnswer: 0
            }
        ],


        9: [
            {
                question: "Harakat qancha vaqt davom etishi mumkin?",
                options: ["Cheklangan vaqt", "Cheksiz vaqt", "Faqat 1 soat", "Faqat 1 minut"],
                correctAnswer: 0
            },
            {
                question: "Kuchning ikki turi qanday nomlanadi?",
                options: ["Statik va dinamika", "Kuch va ish", "Mass va tezlik", "Bosim va harorat"],
                correctAnswer: 0
            },
            {
                question: "Qaysi birlikda bosim o‘lchanadi?",
                options: ["Paskal", "Neyton", "Joul", "Volt"],
                correctAnswer: 0
            },
            {
                question: "Qanday harakat turlari mavjud?",
                options: ["To‘g‘ri chiziqli, aylana va to‘lqin", "Faqat aylana", "Faqat to‘lqin", "Faqat to‘g‘ri chiziqli"],
                correctAnswer: 0
            },
            {
                question: "Elektr zaryadining o‘lchov birligi nima?",
                options: ["Kulon", "Amper", "Volt", "Joul"],
                correctAnswer: 0
            },
            {
                question: "Gravitatsiya kuchi qanday ishlaydi?",
                options: ["Jismlarni bir-biriga tortadi", "Jismlarni suradi", "Harakatni tezlashtiradi", "Harakatni to‘xtatadi"],
                correctAnswer: 0
            },
            {
                question: "Qaysi birlikda ish o‘lchanadi?",
                options: ["Joul", "Neyton", "Volt", "Amper"],
                correctAnswer: 0
            },
            {
                question: "Harorat qanday o‘lchanadi?",
                options: ["Kelvin va Selsiy", "Metr va Kilogramm", "Sekund va Amper", "Volt va Joul"],
                correctAnswer: 0
            },
            {
                question: "Massa qanday o‘lchanadi?",
                options: ["Kilogramm", "Metr", "Sekund", "Amper"],
                correctAnswer: 0
            },
            {
                question: "Elektr tokining kuchini o‘lchaydigan asbob nima?",
                options: ["Ampermetr", "Voltmeter", "Termometr", "Barometr"],
                correctAnswer: 0
            }
        ],


        10: [
            {
                question: "Neytron qaysi zarrachalardan biridir?",
                options: ["Atom yadrosining tarkibiy qismi", "Elektron", "Proton", "Fotonga o‘xshaydi"],
                correctAnswer: 0
            },
            {
                question: "Fotonga oid xususiyat nima?",
                options: ["Nur zarrasi", "Og‘irlik", "Elektr zaryadi", "Massa"],
                correctAnswer: 0
            },
            {
                question: "Kvant mexanikasi kim tomonidan ishlab chiqilgan?",
                options: ["Niels Bohr", "Albert Eynshteyn", "Isaac Nyuton", "Galileo Galilei"],
                correctAnswer: 0
            },
            {
                question: "Termodinamikaning birinchi qonuni nima haqida?",
                options: ["Energiya saqlanishi", "Massa saqlanishi", "Harorat o‘zgarishi", "Kuch ta’siri"],
                correctAnswer: 0
            },
            {
                question: "Yadro reaksiyasi nima?",
                options: ["Atom yadrosining o‘zgarishi", "Kimyoviy reaksiya", "Elektron harakati", "Harakat tezligi"],
                correctAnswer: 0
            },
            {
                question: "Qaysi narsa haroratni o‘lchash uchun ishlatiladi?",
                options: ["Termometr", "Barometr", "Ampermetr", "Voltmeter"],
                correctAnswer: 0
            },
            {
                question: "Yorug‘lik nimalardan iborat?",
                options: ["Fotondan", "Elektrondan", "Protonlardan", "Neytronlardan"],
                correctAnswer: 0
            },
            {
                question: "Elektr tokining kuchini qanday o‘lchashadi?",
                options: ["Amper", "Volt", "Joul", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Kuchlanish qanday birlikda o‘lchanadi?",
                options: ["Volt", "Amper", "Joul", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Massa va og‘irlik orasidagi farq nima?",
                options: ["Massa jismlarning o‘lchami, og‘irlik esa yer tortishish kuchi", "Massa kuch, og‘irlik esa tezlik", "Massa va og‘irlik bir xil", "Massa tezlik, og‘irlik kuch"],
                correctAnswer: 0
            }
        ],


        11: [
            {
                question: "Relativistik massa nima?",
                options: ["Harakatdagi jismlarning massasi", "Tinch jismlarning massasi", "Atom massasi", "Molekula massasi"],
                correctAnswer: 0
            },
            {
                question: "Kvant mexanikasining asosiy qonuni nima?",
                options: ["Heisenbergning noaniqlik prinsipi", "Energiya saqlanishi", "Massa saqlanishi", "Harorat o‘zgarishi"],
                correctAnswer: 0
            },
            {
                question: "Atom yadrosi qaysi zarrachalardan tashkil topgan?",
                options: ["Proton va neytronlar", "Elektronlar", "Fotolar", "Atomlar"],
                correctAnswer: 0
            },
            {
                question: "Elektromagnit to‘lqinlar nimalardan iborat?",
                options: ["Elektr maydoni va magnit maydoni", "Atom yadrosi", "Elektronlar", "Neytronlar"],
                correctAnswer: 0
            },
            {
                question: "Termodinamikaning ikkinchi qonuni nima?",
                options: ["Entropiya oshishi", "Energiya saqlanishi", "Massa saqlanishi", "Harorat pasayishi"],
                correctAnswer: 0
            },
            {
                question: "Qaysi nazariya atomlarning tuzilishini tushuntiradi?",
                options: ["Kvant nazariyasi", "Neytron nazariyasi", "Gravitatsiya nazariyasi", "Relativistik nazariya"],
                correctAnswer: 0
            },
            {
                question: "Neytron yadroda qanday rol o‘ynaydi?",
                options: ["Yadroni barqarorlashtiradi", "Yadro massasini kamaytiradi", "Elektr zaryadini oshiradi", "Yadro massasini kamaytiradi"],
                correctAnswer: 0
            },
            {
                question: "Fotonga oid xususiyat nima?",
                options: ["Nur zarrasi", "Massa", "Elektr zaryadi", "Tezlik"],
                correctAnswer: 0
            },
            {
                question: "Energiya qanday o‘lchanadi?",
                options: ["Joul", "Volt", "Amper", "Neyton"],
                correctAnswer: 0
            },
            {
                question: "Yadro reaksiyasi qaysi elementda sodir bo‘ladi?",
                options: ["Atom yadrosida", "Elektron bulutida", "Fotonda", "Molekulada"],
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
                    <h1>GhostIQ - Fizika Testi</h1>
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