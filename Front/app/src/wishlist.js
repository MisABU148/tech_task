import { useState } from "react";

export default function Wishlist() {
    const [wishes, setWishes] = useState([]);
    const [input, setInput] = useState("");

    // Добавление нового желания
    const addWish = () => {
        if (input.trim()) {
            setWishes([...wishes, input.trim()]);
            setInput("");
        }
    };

    // Удаление желания по индексу
    const removeWish = (index) => {
        setWishes(wishes.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: 20, textAlign: "center" }}>
            <h2>Список желаний</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ padding: 5, marginRight: 10 }} // Минималистичный стиль
            />
            <button onClick={addWish} style={{ padding: 5, cursor: "pointer" }}>Добавить</button>
            <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
                {wishes.length > 0 ? (
                    wishes.map((wish, index) => (
                        <li key={index} style={{ marginBottom: 10 }}>
                            {wish} <button onClick={() => removeWish(index)}>Удалить</button>
                        </li>
                    ))
                ) : (
                    <p>Пока желаний нет</p>
                )}
            </ul>
        </div>
    );
}

/*
Улучшения:
1. Использовать fetch или axios для отправки HTTP-запросов к API.
2. Обрабатывать асинхронные запросы с помощью useEffect.
3. Добавить обработку ошибок.
4. Подключить базу данных.
5. Добавить уведомления о действиях пользователя.
*/
