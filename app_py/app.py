from datetime import datetime
from flask import Flask, request, jsonify

app = Flask(__name__)
tasks = []
next_id = 0


@app.route('/')
def index():
    return "Hello!"

def validate_date(date_str):
    try:
        return datetime.strptime(date_str, "%d-%m-%Y")
    except ValueError:
        return None

@app.route('/tasks', methods=["POST"])
def add_task():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    deadline_str = data.get("deadline")
    deadline = validate_date(deadline_str)

    if not title or not deadline:
        return jsonify({"error": "Invalid input deadline"}), 400

    global next_id
    task = {"id": next_id, "title": title, "description": description, "deadline": deadline_str}
    tasks.append(task)
    next_id += 1

    return jsonify(task), 201


@app.route("/tasks", methods=["GET"])
def get_tasks():
    sorted_tasks = sorted(tasks, key=lambda x: validate_date(x["deadline"]))
    return jsonify(sorted_tasks)


@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]
    return jsonify({"message": "Task deleted"}), 200


if __name__ == '__main__':
    app.run()

'''
Улучшения:
1. Подключить базу данных.
2. Добавить аутентификацию пользователей.
3. Улучшить обработку ошибок и логирование.
4. Реализовать обновление задач (PUT / PATCH запросы).
5. Сделать тесты для API.

'''