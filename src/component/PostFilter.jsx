import React from "react";
import MySelect from "./UI/Select/MySelect";
import MyInput from "./UI/Input/MyInput";

export default function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        value={filter.query}
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
        placeholder="Поиск..."
      />
      <MySelect
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "body", name: "По описанию" },
        ]}
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
      ></MySelect>
    </div>
  );
}
