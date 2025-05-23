import React, { useState, useEffect } from 'react';
import './Tarix.scss';
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
                question: "Qadimgi odamlar asosan qanday hayot tarzini kechirgan?",
                options: ["Ko‘chmanchi", "Shaharlik", "Dehqon", "Hunarmand"],
                correctAnswer: 0
            },
            {
                question: "Qadimgi odamlar yong‘inga qanday erishgan?",
                options: ["Quyosh nuri bilan", "Shamol yordamida", "Toshni toshga urib", "Yog‘ochni suvga solib"],
                correctAnswer: 2
            },
            {
                question: "Zarafshon va Qashqadaryo vohalari qayerda joylashgan?",
                options: ["Shimoliy O‘zbekiston", "Janubiy O‘zbekiston", "Sharqiy O‘zbekiston", "G‘arbiy O‘zbekiston"],
                correctAnswer: 1
            },
            {
                question: "Eng qadimgi davr qanday nomlanadi?",
                options: ["Temir davri", "Tosh davri", "Bronza davri", "Yangi davr"],
                correctAnswer: 1
            },
            {
                question: "Qadimgi odamlar ovda nima ishlatgan?",
                options: ["Kompyuter", "Tosh qurollar", "Traktor", "O‘q otar qurol"],
                correctAnswer: 1
            },
            {
                question: "Tosh davri nechta davrga bo‘linadi?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 1
            },
            {
                question: "Mehnat qurollari qayerdan topilgan?",
                options: ["Qumdan", "Suvdan", "Arxeologik qazishmalardan", "Do‘kondan"],
                correctAnswer: 2
            },
            {
                question: "Odamlar qanday qilib yong‘in saqlashni o‘rgangan?",
                options: ["Quyoshda quritib", "Yog‘ochni olovga tashlab", "Toshni toshga urib", "Hayvonlarni chaqirib"],
                correctAnswer: 2
            },
            {
                question: "Qadimgi odamlar nima uchun guruh bo‘lib yashagan?",
                options: ["Ko‘proq ov qilish uchun", "Oson uxlab olish uchun", "Raqsga tushish uchun", "Yolg‘izlikdan zerikib"],
                correctAnswer: 0
            },
            {
                question: "Paleolit davri deganda nima tushuniladi?",
                options: ["Yangi tosh davri", "O‘rta tosh davri", "Qadimgi tosh davri", "Temir davri"],
                correctAnswer: 2
            }
        ],
        6: [
            {
                question: "Eng qadimgi shaharlar qayerda paydo bo‘lgan?",
                options: ["O‘rta Osiyo", "Misr va Mesopotamiya", "Hindiston", "Yevropa"],
                correctAnswer: 1
            },
            {
                question: "Misrda fir'avn kim edi?",
                options: ["Harbiy", "Ilm-fan vakili", "Shoh", "Qul"],
                correctAnswer: 2
            },
            {
                question: "Qaysi daryo Misr hayoti uchun muhim bo‘lgan?",
                options: ["Nil", "Dunoy", "Tigr", "Frot"],
                correctAnswer: 0
            },
            {
                question: "Qadimgi Mesopotamiya qaysi daryolar oralig‘ida joylashgan?",
                options: ["Nil va Iordaniya", "Amu va Sirdaryo", "Tigr va Frot", "Volga va Don"],
                correctAnswer: 2
            },
            {
                question: "Zardushtiylik dinining asosiy kitobi nima?",
                options: ["Tavrot", "Avesto", "Injil", "Qur’on"],
                correctAnswer: 1
            },
            {
                question: "Qadimgi Xitoyda imperator qanday nomlangan?",
                options: ["Sulton", "Shoh", "Xon", "Van"],
                correctAnswer: 3
            },
            {
                question: "“Kod Hammurapi” nima edi?",
                options: ["Diniy qoida", "Qonunlar to‘plami", "Urush usuli", "Tarixiy joy"],
                correctAnswer: 1
            },
            {
                question: "Qadimgi Yunonistonda shahar-davlatlar qanday nomlangan?",
                options: ["Provinsiyalar", "Viloyatlar", "Polislar", "Tumanlar"],
                correctAnswer: 2
            },
            {
                question: "Qadimgi Rimda eng yuqori hokimiyat kimda bo‘lgan?",
                options: ["Patrisiylarda", "Qullarda", "Senatda", "Imperatorda"],
                correctAnswer: 3
            },
            {
                question: "Budda dini qayerda paydo bo‘lgan?",
                options: ["Xitoy", "Hindiston", "Arabiston", "Eron"],
                correctAnswer: 1
            }
        ],

        7: [
            {
                question: "Amir Temur qaysi yilda tug‘ilgan?",
                options: ["1336", "1380", "1405", "1320"],
                correctAnswer: 0
            },
            {
                question: "Amir Temur davlatni qanday boshqargan?",
                options: ["Demokratik", "Xalq bilan", "Markazlashgan monarxiya", "Federativ"],
                correctAnswer: 2
            },
            {
                question: "Amir Temurning poytaxti qaysi shahar bo‘lgan?",
                options: ["Samarqand", "Buxoro", "Termiz", "Urganch"],
                correctAnswer: 0
            },
            {
                question: "Temur tuzuklari asarida nima bayon etilgan?",
                options: ["Urushlar", "Davlat boshqaruvi va nizomlar", "Ilmiy kashfiyotlar", "Savdo yo‘llari"],
                correctAnswer: 1
            },
            {
                question: "Amir Temurning avlodlaridan kim Hindistonda imperiya asos solgan?",
                options: ["Bobur", "Ulug‘bek", "Sulton Muhammad", "Abdurahmon"],
                correctAnswer: 0
            },
            {
                question: "Movarounnahr atamasi qaysi hududga nisbatan ishlatilgan?",
                options: ["Xorazm", "Amudaryo va Sirdaryo oralig‘i", "Farg‘ona", "Balkh"],
                correctAnswer: 1
            },
            {
                question: "Amir Temur Samarqandni nima deb atagan?",
                options: ["Uchish shahrim", "Dilbandim", "Dunyoning go‘zalligi", "Yuragim shahridir"],
                correctAnswer: 3
            },
            {
                question: "Temuriylar davrida eng yirik ilm-fan markazi qaysi edi?",
                options: ["Shahrisabz", "Urganch", "Buxoro", "Samarqand"],
                correctAnswer: 3
            },
            {
                question: "Ulug‘bek kim bo‘lgan?",
                options: ["Temurning jiyani", "Temurning o‘g‘li", "Temurning nevarasi", "Temurning amakivachchasi"],
                correctAnswer: 2
            },
            {
                question: "Ulug‘bek madrasasi qayerda joylashgan?",
                options: ["Buxoro", "Toshkent", "Samarqand", "Xiva"],
                correctAnswer: 2
            }
        ],

        8: [
            {
                question: "Xiva xonligi qachon tashkil topgan?",
                options: ["1511-yil", "1598-yil", "1709-yil", "1756-yil"],
                correctAnswer: 1
            },
            {
                question: "Buxoro amirligi hukmdori qanday atalgan?",
                options: ["Shoh", "Xon", "Amir", "Sulton"],
                correctAnswer: 2
            },
            {
                question: "Qo‘qon xonligi poytaxti dastlab qayer bo‘lgan?",
                options: ["Qo‘qon", "Andijon", "Namangan", "Marg‘ilon"],
                correctAnswer: 3
            },
            {
                question: "Xiva xonligi asoschisi kim edi?",
                options: ["Abulg‘oziy Bahodirxon", "Ilbarsxon", "Shohniyozxon", "Arab Muhammadxon"],
                correctAnswer: 3
            },
            {
                question: "Buxoro amirligining diniy boshlig‘i kim bo‘lgan?",
                options: ["Qozikalon", "Mufti", "Imom", "Domla"],
                correctAnswer: 0
            },
            {
                question: "Qo‘qon xonligida Solihboy devonbegi kim bo‘lgan?",
                options: ["Vazir", "Qo‘shinboshi", "Soliq yig‘uvchi", "Tarixchi"],
                correctAnswer: 0
            },
            {
                question: "Jadidchilik harakati qaysi sohalarda islohot qilishni ko‘zlagan?",
                options: ["Siyosat", "Diniy masalalar", "Maorif va madaniyat", "Qishloq xo‘jaligi"],
                correctAnswer: 2
            },
            {
                question: "Xiva xonligida 1873-yilda nima sodir bo‘lgan?",
                options: ["Islohotlar", "Rossiya tomonidan bosib olingan", "Qo‘zg‘olon", "Yangi poytaxt barpo etilgan"],
                correctAnswer: 1
            },
            {
                question: "Amir Muzaffar kim edi?",
                options: ["Qo‘qon xoni", "Xiva xoni", "Buxoro amiri", "Jadidchi"],
                correctAnswer: 2
            },
            {
                question: "Jadidlarning asosiy maqsadi nima edi?",
                options: ["Yevropaga urush e’lon qilish", "Amirlikni kuchaytirish", "Yangi maktablar ochish", "Soliq yig‘ish"],
                correctAnswer: 2
            }
        ],

        9: [
            {
                question: "Jahon urushlaridan birinchisi qachon boshlangan?",
                options: ["1912-yil", "1914-yil", "1918-yil", "1920-yil"],
                correctAnswer: 1
            },
            {
                question: "Versal shartnomasi kimlar o‘rtasida tuzilgan?",
                options: ["AQSH va Rossiya", "Germaniya va Antanta", "Fransiya va Italiya", "Turkiya va Angliya"],
                correctAnswer: 1
            },
            {
                question: "Birinchi jahon urushi yakunida Germaniyada nima sodir bo‘ldi?",
                options: ["Qirollik mustahkamlandi", "Monarxiya tiklandi", "Respublika e’lon qilindi", "Imperator hokimiyatni kuchaytirdi"],
                correctAnswer: 2
            },
            {
                question: "SSSR qachon tashkil topgan?",
                options: ["1917-yil", "1922-yil", "1939-yil", "1945-yil"],
                correctAnswer: 1
            },
            {
                question: "Buyuk Depressiya qaysi davlatda boshlandi?",
                options: ["Germaniya", "Fransiya", "AQSH", "Angliya"],
                correctAnswer: 2
            },
            {
                question: "Ikkinchi jahon urushi qachon boshlangan?",
                options: ["1937-yil", "1939-yil", "1941-yil", "1943-yil"],
                correctAnswer: 1
            },
            {
                question: "Fashistik Italiya yetakchisi kim edi?",
                options: ["Stalin", "Gitler", "Mussolini", "Ruzvelt"],
                correctAnswer: 2
            },
            {
                question: "Gitler boshchiligidagi partiya qanday atalgan?",
                options: ["Kommunistik", "Natsist", "Sotsial demokrat", "Fashistlar partiyasi"],
                correctAnswer: 1
            },
            {
                question: "1941-yil 22-iyunda nima sodir bo‘ldi?",
                options: ["Versal bitimi imzolandi", "SSSR Germaniyaga hujum qildi", "Germaniya SSSRga bostirib kirdi", "Yaponlar Xitoyni egalladi"],
                correctAnswer: 2
            },
            {
                question: "Normandiyaga ittifoqchilar qachon tushishdi?",
                options: ["1944-yil", "1941-yil", "1943-yil", "1945-yil"],
                correctAnswer: 0
            }
        ],

        10: [
            {
                question: "Yevropada Uyg‘onish davri qayerda boshlangan?",
                options: ["Fransiya", "Angliya", "Italiya", "Ispaniya"],
                correctAnswer: 2
            },
            {
                question: "Martin Lyuter qanday harakat asoschisi edi?",
                options: ["Uyg‘onish", "Reformatsiya", "Imperializm", "Ixtirolar"],
                correctAnswer: 1
            },
            {
                question: "Amerika qit’asi qachon kashf etilgan?",
                options: ["1492-yil", "1500-yil", "1488-yil", "1519-yil"],
                correctAnswer: 0
            },
            {
                question: "Buyuk geografik kashfiyotlar davri qaysi asrda boshlangan?",
                options: ["XIII asr", "XIV asr", "XV asr", "XVI asr"],
                correctAnswer: 2
            },
            {
                question: "Fransuz inqilobi qachon boshlangan?",
                options: ["1776-yil", "1789-yil", "1804-yil", "1812-yil"],
                correctAnswer: 1
            },
            {
                question: "Napoleon qaysi davlatni boshqargan?",
                options: ["Angliya", "Germaniya", "Fransiya", "Ispaniya"],
                correctAnswer: 2
            },
            {
                question: "Angliyada parlament monarxiyasi qachon vujudga keldi?",
                options: ["1689-yil", "1649-yil", "1700-yil", "1750-yil"],
                correctAnswer: 0
            },
            {
                question: "Industrial inqilob ilk bor qayerda sodir bo‘lgan?",
                options: ["Fransiya", "Germaniya", "AQSH", "Angliya"],
                correctAnswer: 3
            },
            {
                question: "Amerika mustaqillik deklaratsiyasi qachon qabul qilingan?",
                options: ["1776-yil", "1787-yil", "1800-yil", "1791-yil"],
                correctAnswer: 0
            },
            {
                question: "Reformatsiya natijasida qanday oqibat yuz berdi?",
                options: ["Katoliklik kuchaydi", "Protestantlik paydo bo‘ldi", "Monarxiya tugadi", "Imperiyalar tuzildi"],
                correctAnswer: 1
            }
        ],

        11: [
            {
                question: "Mustaqil O‘zbekiston qachon e’lon qilingan?",
                options: ["1990-yil 31-avgust", "1991-yil 1-sentabr", "1991-yil 31-avgust", "1990-yil 1-sentabr"],
                correctAnswer: 2
            },
            {
                question: "O‘zbekiston BMTga qachon a’zo bo‘lgan?",
                options: ["1992-yil", "1991-yil", "1993-yil", "1995-yil"],
                correctAnswer: 0
            },
            {
                question: "Iqtisodiy islohotlar necha bosqichga bo‘lingan?",
                options: ["3", "5", "7", "2"],
                correctAnswer: 1
            },
            {
                question: "1992-yilgi Konstitutsiyaga ko‘ra O‘zbekiston qanday davlat?",
                options: ["Shohona", "Sotsialistik", "Respublika", "Federativ"],
                correctAnswer: 2
            },
            {
                question: "O‘zbekiston Konstitutsiyasi qachon qabul qilingan?",
                options: ["1991-yil", "1993-yil", "1992-yil", "1990-yil"],
                correctAnswer: 2
            },
            {
                question: "Mustaqillikning ilk yillarida qanday siyosiy tizim mustahkamlandi?",
                options: ["Monarxiya", "Avtoritarizm", "Demokratiya", "Diktatura"],
                correctAnswer: 2
            },
            {
                question: "O‘zbekiston Respublikasining birinchi Prezidenti kim bo‘lgan?",
                options: ["Shavkat Mirziyoyev", "Islom Karimov", "Abduhalimov", "Rustam Inoyatov"],
                correctAnswer: 1
            },
            {
                question: "2021-yilgi Prezident saylovida kim g‘alaba qozondi?",
                options: ["Islom Karimov", "Shavkat Mirziyoyev", "Rustam Qosimov", "Abdulla Aripov"],
                correctAnswer: 1
            },
            {
                question: "Strategik rivojlanish konsepsiyasi nechanchi yillarda qabul qilindi?",
                options: ["2017–2021", "2016–2020", "2020–2025", "2019–2023"],
                correctAnswer: 0
            },
            {
                question: "Milliy tiklanishdan milliy yuksalishga o‘tish deganda nima nazarda tutiladi?",
                options: ["Urushga tayyorgarlik", "Harbiy kuchni oshirish", "Yangi O‘zbekistonni barpo qilish", "Chegaralarni yopish"],
                correctAnswer: 2
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
                    <h1>GhostIQ - Tarix Testi</h1>
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