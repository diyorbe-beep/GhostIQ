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
        6: [
            {
                question: "Modda nima?",
                options: ["Faqat gaz holatidagi jismlar", "Faqat suyuq holatdagi jismlar", "Fazoviy bo‘shliq", "Moddiy jismlarni tashkil etuvchi narsa"],
                correctAnswer: 3
            },
            {
                question: "Moddaning holatlari nechta?",
                options: ["2 ta", "3 ta", "4 ta", "5 ta"],
                correctAnswer: 1
            },
            {
                question: "Gaz holatdagi moddalarga xos xususiyat:",
                options: ["Hajmi o‘zgarmaydi", "Shakli o‘zgarmaydi", "Hajmi va shakli o‘zgaradi", "Faqat o‘ta sovuqda mavjud"],
                correctAnswer: 2
            },
            {
                question: "Qattiq holatdagi modda qanday bo‘ladi?",
                options: ["Oqadi", "Tez bug‘lanadi", "Shakli doimiy", "Faqat issiqda mavjud"],
                correctAnswer: 2
            },
            {
                question: "Kimyo nimani o‘rganadi?",
                options: ["Jonli organizmlarni", "Moddalarning tuzilishi va xossalarini", "Yer qatlamlarini", "Hayvonlar hayotini"],
                correctAnswer: 1
            },
            {
                question: "Suv qanday modda?",
                options: ["Element", "Aralashma", "Birikma", "Gaz"],
                correctAnswer: 2
            },
            {
                question: "Aralashmaga misol:",
                options: ["Oltin", "Tuzli suv", "Vodorod", "Temir"],
                correctAnswer: 1
            },
            {
                question: "Suvning qaynash harorati necha °C?",
                options: ["90°C", "100°C", "80°C", "0°C"],
                correctAnswer: 1
            },
            {
                question: "Kimyoviy o‘zgarish nima?",
                options: ["Faqat holat o‘zgaradi", "Modda yo‘qoladi", "Yangi modda hosil bo‘ladi", "Suv bug‘lanadi"],
                correctAnswer: 2
            },
            {
                question: "Quyidagilardan qaysi biri sof modda?",
                options: ["Havo", "Tuzli suv", "Temir", "Shakarli choy"],
                correctAnswer: 2
            }
        ],

        7: [
            {
                question: "Atom nima?",
                options: ["Moddaning eng kichik bo‘lagi", "Zarrachalar to‘plami", "Suyuqlik tomchisi", "Elektronlar yig‘indisi"],
                correctAnswer: 0
            },
            {
                question: "Element nima?",
                options: ["Bitta atomdan tashkil topgan modda", "Gazlar aralashmasi", "Metall va metallmaslar", "Fazoviy energiya"],
                correctAnswer: 0
            },
            {
                question: "Kimyoviy formulasi H₂O bo‘lgan modda bu —",
                options: ["Vodorod", "Oksid", "Suv", "Kislorod"],
                correctAnswer: 2
            },
            {
                question: "Molekula nima?",
                options: ["Suv tomchisi", "2 yoki undan ortiq atomdan tashkil topgan zarracha", "Yaltiroq jism", "Suyuqlik"],
                correctAnswer: 1
            },
            {
                question: "Kimyoviy belgi nimalarni bildiradi?",
                options: ["Faqat atomlarni", "Elementlarni", "Aralashmalarni", "Qattiq jismlarni"],
                correctAnswer: 1
            },
            {
                question: "Formulada CO₂ nimani anglatadi?",
                options: ["Uglerodli suv", "Uglerod oksidi", "Kislorodli karbon", "Uglerod(IV)-oksid"],
                correctAnswer: 3
            },
            {
                question: "Kimyo fanida reaksiya nima?",
                options: ["Moddaning yo‘qolishi", "Issiqlik chiqishi", "Yangi moddaning hosil bo‘lish jarayoni", "Moddaning holati o‘zgarishi"],
                correctAnswer: 2
            },
            {
                question: "Zaryadlangan zarracha nima deb ataladi?",
                options: ["Atom", "Ion", "Molekula", "Element"],
                correctAnswer: 1
            },
            {
                question: "Metallar uchun xos xossa:",
                options: ["Elektr tokini o‘tkazmaydi", "Shaklsiz", "Yaltiroq va issiqlikni o‘tkazadi", "Faqat suyuqlikda mavjud"],
                correctAnswer: 2
            },
            {
                question: "Oksidlar qanday birikmalar?",
                options: ["Vodorodli birikmalar", "Kislorod ishtirok etmaydi", "Kislorod va boshqa elementdan tashkil topgan birikmalar", "Faqat gazsimon modda"],
                correctAnswer: 2
            }
        ],

        8: [
            {
                question: "Moddalarning nisbiy molekulyar massasi qanday belgilanadi?",
                options: ["Mr", "Ar", "M", "n"],
                correctAnswer: 0
            },
            {
                question: "1 mol modda tarkibida nechta zarracha bo‘ladi?",
                options: ["6,02 × 10²²", "6,02 × 10²³", "3,01 × 10²³", "1,00 × 10²⁴"],
                correctAnswer: 1
            },
            {
                question: "Nisbiy atom massasi nima?",
                options: ["Moddaning fizik massasi", "Atomning boshqa atomga nisbatan og‘irligi", "Atom soni", "Atomning zaryadi"],
                correctAnswer: 1
            },
            {
                question: "Avogadro soni nimani bildiradi?",
                options: ["Modda zichligini", "Atom raqamini", "1 moldagi zarrachalar sonini", "Molekula massasini"],
                correctAnswer: 2
            },
            {
                question: "Oksidlar deganda nimani tushunamiz?",
                options: ["Faqat metall modda", "Faqat gaz", "Kislorod va boshqa elementdan tashkil topgan birikmalar", "Zaryadlangan atomlar"],
                correctAnswer: 2
            },
            {
                question: "Kimyoviy reaksiya tenglamasida moddaning miqdori nimada o‘lchanadi?",
                options: ["Litrda", "Mol", "Kg", "Protsent"],
                correctAnswer: 1
            },
            {
                question: "Gazlar uchun Avogadro qonuniga ko‘ra, bir xil hajmda, bir xil sharoitda ular:",
                options: ["Har xil miqdorda zarracha bo‘ladi", "Bir xil zarracha soniga ega bo‘ladi", "Faqat vodorod uchun amal qiladi", "Fazoviy kuch hosil qiladi"],
                correctAnswer: 1
            },
            {
                question: "Suv formulasi bo‘yicha molekulasida nechta atom bor?",
                options: ["2", "3", "4", "1"],
                correctAnswer: 1
            },
            {
                question: "Zichlik formulasi qanday?",
                options: ["ρ = V/m", "ρ = m/V", "ρ = m × V", "ρ = m × n"],
                correctAnswer: 1
            },
            {
                question: "Kimyoviy reaksiya vaqtida moddaning ... o‘zgaradi.",
                options: ["Shakli", "Massasi", "Tarkibi", "Temperaturasi"],
                correctAnswer: 2
            }
        ],


        9: [
            {
                question: "Periodik qonunni kim kashf qilgan?",
                options: ["Avogadro", "Mendeleyev", "Boyle", "Lomonosov"],
                correctAnswer: 1
            },
            {
                question: "Periodik jadvalda elementlar qanday tartibda joylashtirilgan?",
                options: ["Alifbo bo‘yicha", "Atom massasiga ko‘ra", "Nisbiy atom massasiga ko‘ra", "Atom raqamiga ko‘ra"],
                correctAnswer: 3
            },
            {
                question: "Metallar qanday elementlar hisoblanadi?",
                options: ["Elektron beruvchi", "Elektron oluvchi", "Faol gazlar", "Suyuqlik"],
                correctAnswer: 0
            },
            {
                question: "Ikkilamchi oksid bu —",
                options: ["Metall oksid", "Metallmas oksid", "Bir nechta elementli oksid", "Ikki valentli elementdan tashkil topgan oksid"],
                correctAnswer: 1
            },
            {
                question: "Ishqorlar qaysi guruh elementlari bilan hosil bo‘ladi?",
                options: ["IIA", "IA", "VIIA", "VIA"],
                correctAnswer: 1
            },
            {
                question: "Kislotali oksidning suv bilan reaksiyasi natijasida nima hosil bo‘ladi?",
                options: ["Asos", "Kislota", "Tuz", "Metall"],
                correctAnswer: 1
            },
            {
                question: "NaOH qanday modda?",
                options: ["Kislota", "Tuz", "Asos", "Oksid"],
                correctAnswer: 2
            },
            {
                question: "Fe₂O₃ — bu qanday oksid?",
                options: ["Asosli", "Amfoter", "Kislotali", "Neytral"],
                correctAnswer: 0
            },
            {
                question: "Ion almashinish reaksiyasi natijasida nima hosil bo‘ladi?",
                options: ["Faqat gaz", "Faqat issiqlik", "Yangi tuz va boshqa modda", "Element"],
                correctAnswer: 2
            },
            {
                question: "Kislotaning suvdagi eritmasida qanday ionlar hosil bo‘ladi?",
                options: ["OH⁻", "H⁺", "Na⁺", "Cl⁻"],
                correctAnswer: 1
            }
        ],


        10: [
            {
                question: "Organik kimyo nimani o‘rganadi?",
                options: ["Kislorod birikmalarini", "Metallarning tuzilishini", "Uglerod birikmalarini", "Mineral tuzlarni"],
                correctAnswer: 2
            },
            {
                question: "Metanning kimyoviy formulasi nima?",
                options: ["C₂H₆", "CH₄", "C₃H₈", "C₄H₁₀"],
                correctAnswer: 1
            },
            {
                question: "Alkenlar umumiy formulasi qanday?",
                options: ["CₙH₂ₙ₊₂", "CₙH₂ₙ", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₁"],
                correctAnswer: 1
            },
            {
                question: "Spirtlarda funksional guruh qanday?",
                options: ["–OH", "–COOH", "–NH₂", "–CHO"],
                correctAnswer: 0
            },
            {
                question: "Uglevodlar tarkibida qaysi elementlar mavjud?",
                options: ["Na, Cl, H", "C, H, O", "Fe, O, C", "H, N, C"],
                correctAnswer: 1
            },
            {
                question: "Karbon kislotalarning umumiy formulasi?",
                options: ["R–OH", "R–CHO", "R–COOH", "R–NH₂"],
                correctAnswer: 2
            },
            {
                question: "Metanol nima?",
                options: ["Karbon kislotasi", "Bir atomli spirt", "Alken", "Aldegid"],
                correctAnswer: 1
            },
            {
                question: "Organik moddalar deganda nimani tushunamiz?",
                options: ["Faqat kislorodli modda", "Uglerod asosida tuzilgan birikmalar", "Ionli birikmalar", "Sof metallar"],
                correctAnswer: 1
            },
            {
                question: "Sut kislotasi qanday kislotalar guruhiga kiradi?",
                options: ["Mineral", "Organik", "Neytral", "Amfoter"],
                correctAnswer: 1
            },
            {
                question: "Alkinlar qaysi bog‘lanmaga ega?",
                options: ["Yakka bog‘", "Ikki bog‘", "Uch bog‘", "Chelik bog‘"],
                correctAnswer: 2
            }
        ],


        11: [
            {
                question: "Izomerlar nima?",
                options: ["Bir xil tuzilishga ega moddalar", "Bir xil tarkibli, ammo tuzilishi har xil moddalar", "Faqat gazsimon moddalar", "Faqat suyuq moddalar"],
                correctAnswer: 1
            },
            {
                question: "Polimerlar nima?",
                options: ["Kislotali moddalar", "Kislorodli birikmalar", "Yuqori molekulyar organik moddalar", "Metall oksidlari"],
                correctAnswer: 2
            },
            {
                question: "Glikozid bog‘i qayerda uchraydi?",
                options: ["Spirtlarda", "Uglevodlarda", "Oksidlarda", "Proteinlarda"],
                correctAnswer: 1
            },
            {
                question: "Proteinlar qanday polimerlardir?",
                options: ["Uglevodli", "Peptid bog‘li", "Esterli", "Kislotalar asosli"],
                correctAnswer: 1
            },
            {
                question: "Amkislotalar qanday funksional guruhlarga ega?",
                options: ["–OH va –NH₂", "–COOH va –OH", "–COOH va –NH₂", "–CHO va –NH₂"],
                correctAnswer: 2
            },
            {
                question: "Sopol, plastik va shisha nima hisoblanadi?",
                options: ["Organik moddalar", "Noorganik polimerlar", "Metall birikmalar", "Organik kislotalar"],
                correctAnswer: 1
            },
            {
                question: "Neytralizatsiya reaksiyasi natijasida nima hosil bo‘ladi?",
                options: ["Kislota", "Asos", "Tuz va suv", "Metall"],
                correctAnswer: 2
            },
            {
                question: "Sabzavotlar tarkibidagi vitamin C qaysi modda hisoblanadi?",
                options: ["Askorbin kislotasi", "Benzen", "Sulfat", "Ester"],
                correctAnswer: 0
            },
            {
                question: "Fermentlar nima?",
                options: ["Zaharlovchi moddalar", "Kimyoviy reaksiya tezligini oshiruvchi oqsillar", "Metall birikmalar", "Zich molekulalar"],
                correctAnswer: 1
            },
            {
                question: "Biokimyoda asosiy energiya manbai nima?",
                options: ["Protein", "ATP", "Glikogen", "Vitamin"],
                correctAnswer: 1
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
                    <h1>GhostIQ - Kimyo Testi</h1>
                </header>

                {!grade ? (
                    <div className="grade-selection">
                        <h2>Sinfingizni tanlang:</h2>
                        <div className="grade-buttons">
                            {[6, 7, 8, 9, 10, 11].map((g) => (
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