import React, { useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Info = () => {
  // logic
  const history = useNavigate();

  // TODO: set함수 추가하기
  const [ingredientList, setIngredientList] = useState([]); // 사용자가 입력할 재료 목록

  const addIngredient = () => {
    // 기본 데이터 추가
    console.log("재료 추가하기");
    const id = Date.now();

    const newItem = {
      id, //원래 코딩은 id: id, 로 표현해야하지만 이걸 축약해서 그냥 id 로만 표현
      label: `ingredient_${id}`,
      text: "재료명",
      value: "",
    };

    // 기존 배열(ingredientList 라는 배열)에 객체 추가(newItem)할때
    setIngredientList([...ingredientList, newItem]);
  };

  const handelRemove = (selectedId) => {
    console.log("🚀 ~ handelRemove ~ selectedId:", selectedId);
    const filterIgredientList = ingredientList.filter(
      (item) => item.id !== selectedId
    );
    setIngredientList(filterIgredientList);
  };

  const handleNext = () => {
    console.log("chat페이지로 이동");
    // Chat 페이지로 이동 구현
    history("/chat");
  };

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <div className="px-2 pt-6">
          <h1 className="text-4.5xl font-black text-white">
            당신의 냉장고를 알려주세요
          </h1>
        </div>
        {/* // TODO:Title 컴포넌트 */}

        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput
                  key={item.id}
                  content={item}
                  onRemove={handelRemove}
                />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
