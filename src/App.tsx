import { useState } from "react";
import { useTodoState } from "./store/todoStore";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [title, setTitle] = useState("");
  const [filterTodos] = useState(["همه", "تکمیل‌ها", "فعال"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [editId, setEditId] = useState<number | null>(null);
  const addTodo = useTodoState((states) => states.addTodo);
  const deleteTodo = useTodoState((states) => states.deleteTodo);
  const updateTodo = useTodoState((states) => states.updateTodo);
  const completedTodo = useTodoState((states) => states.completedTodo);

  const todos = useTodoState((states) => states.todos);

  function onSubmitHandler(e: any) {
    e.preventDefault();
    if (!title.trim()) return;

    if (editId !== null) {
      updateTodo(editId, title);
    } else {
      addTodo(title);
      console.log(todos);
    }
    setTitle("");
    setEditId(null);
  }

  function deleteHandler(id: number) {
    deleteTodo(id);
  }

  function updateHandler(id: number, title: string) {
    setEditId(id);
    setTitle(title);
  }

  function completedHandler(id: number, completed: boolean) {
    completedTodo(id, completed);
  }

  function filterTodoHandler(index: number) {
    setActiveIndex(index);
  }

  const filteredTodos: Todo[] = todos.filter((todo) => {
    if (activeIndex === 1) return todo.completed;
    if (activeIndex === 2) return !todo.completed;
    return true;
  });

  return (
    <>
      <style>
        {`
            .container {
              width: 100%;
            }

            @media (min-width:768px){
            .container {
              width: fit-content;
            }
            }
          `}
      </style>
      <div dir="rtl" className="md:p-20 p-5">
        <p className="text-red-500 font-extrabold text-3xl">وظایف امروز</p>

        <div className="flex container justify-start items-start flex-col">
          <div className="flex w-full flex-col md:flex-row justify-start items-safe gap-4 mt-10">
            <div className="flex gap-4">
              <form className="flex gap-4" onSubmit={onSubmitHandler} action="">
                <input
                  value={title}
                  type="text"
                  className="border-2 placeholder:text-gray-300 bg-inherit outline-none text-gray-300 border-gray-200 p-3 w-full md:w-[300px] rounded-lg text-sm"
                  placeholder="تسکت رو اینجا بنویس..."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <button
                  type="submit"
                  className="border-2 md:p-3 whitespace-nowrap py-3 px-2 rounded-lg text-sm text-gray-300 hover:bg-[#ef4343] active:bg-[#ef4343] hover:text-white"
                >
                  {editId !== null ? "ویرایش کردن" : "اضافه کردن"}
                </button>
              </form>
            </div>

            <div className="flex gap-2 md:mr-8 mr-0">
              {filterTodos.map((item, index) => (
                <button
                  key={index}
                  onClick={() => filterTodoHandler(index)}
                  className={`px-3 py-1 rounded-xl border-2 border-blue-500 text-xs md:text-sm
            ${activeIndex === index ? "bg-blue-500 text-white" : "bg-transparent text-blue-500"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-10 w-full">
            <ul className="flex flex-col gap-5">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex justify-between items-center gap-16 w-full"
                >
                  <div className="flex gap-1">
                    <span
                      onClick={() => completedHandler(todo.id, todo.completed)}
                      className={`text-xs md:text-sm cursor-pointer transition ${
                        todo.completed
                          ? "text-gray-50 line-through opacity-60"
                          : "text-gray-300"
                      }`}
                    >
                      {todo.title}
                    </span>
                  </div>

                  <div className="flex justify-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20S"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#8080ff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-square-pen-icon lucide-square-pen cursor-pointer"
                      onClick={() => updateHandler(todo.id, todo.title)}
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff0000"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-trash-icon lucide-trash cursor-pointer"
                      onClick={() => deleteHandler(todo.id)}
                    >
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                      <path d="M3 6h18" />
                      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
