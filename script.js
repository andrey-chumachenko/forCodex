document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('beckTestForm');
    const totalScoreSpan = document.getElementById('totalScore');
    const interpretationSpan = document.getElementById('interpretation');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        let totalScore = 0;
        let allQuestionsAnswered = true;

        // Проходим по всем 21 вопросам
        for (let i = 1; i <= 21; i++) {
            const questionName = `q${i}`;
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

            if (selectedOption) {
                totalScore += parseInt(selectedOption.value);
            } else {
                allQuestionsAnswered = false;
                // Опционально: показать сообщение или подсветить непройденный вопрос
                // alert(`Пожалуйста, ответьте на вопрос ${i}.`);
                // return; // Прекратить выполнение, если вопрос не отвечен
            }
        }

        if (!allQuestionsAnswered) {
            alert('Пожалуйста, ответьте на все вопросы перед отправкой.');
            resultDiv.style.display = 'none'; // Скрываем результат, если не все вопросы отвечены
            return;
        }

        // Обновляем общий балл
        totalScoreSpan.textContent = totalScore;

        // Определяем интерпретацию
        let interpretationText = '';
        let interpretationColor = '#388E3C'; // Дефолтный темно-зеленый цвет для интерпретации

        if (totalScore >= 0 && totalScore <= 13) {
            interpretationText = 'Минимальная депрессия.';
        } else if (totalScore >= 14 && totalScore <= 19) {
            interpretationText = 'Легкая депрессия.';
        } else if (totalScore >= 20 && totalScore <= 28) {
            interpretationText = 'Умеренная депрессия.';
        } else if (totalScore >= 29 && totalScore <= 63) {
            interpretationText = 'Тяжелая депрессия.';
        } else {
            interpretationText = 'Ошибка в расчете баллов.'; // На случай непредвиденных значений
        }

        // Обновляем текст интерпретации и устанавливаем цвет
        interpretationSpan.textContent = interpretationText;
        interpretationSpan.style.color = interpretationColor; // Устанавливаем цвет через JavaScript

        // Показываем блок с результатами
        resultDiv.style.display = 'block';
    });
});