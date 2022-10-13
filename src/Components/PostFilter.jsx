import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => { // пропсами будет принимать некоторый объект filter, и функцию, которая этот фильтр будет изменять (мы должны иметь доступ к фильтру в родителстьком компоненте)
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({...filter, query: e.target.value})}
        type="text"
        placeholder="Search..."
      />
      <MySelect
        value={filter.sort}
        // в качестве OnChange будем вызывать sortPorts и передавать то, что приходит из селекта (выбранная пользователем сортировка )
        // Селект возвращает не event, а выбранный алгоритм сортировки (опцию) 
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue="Sort by"
        options={[
          { value: "title", name: "title" },
          { value: "body", name: "body" },
        ]}
      ></MySelect>
    </div>
  );
};

export default PostFilter;
