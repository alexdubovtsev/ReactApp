import { useState } from "react";

// Хук, который предоставляет часто используемый функционал: обработка индикации загрузки и обработка ошибки запроса на получение данных
export const useFetching = (callback) => {
  // Функция принимает колбэк (некоторый запрос, перед которым например нужно включить Loader, а после его выполнения, скрыть Loader
  // Создаем состояние, отвечающее за загрузку
  const [isLoading, setIsLoading] = useState(false);
  // Обрабатываем ошибки при выполнении запроса
  const [error, setError] = useState("");

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args)
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error]
};
