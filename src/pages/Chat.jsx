import React, { useEffect, useState } from "react";
import MessageBox from "../components/MessageBox";
import PrevButton from "../components/PrevButton";
import { MoonLoader } from "react-spinners";

const Chat = ({ ingredientList }) => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS;
  const [value, setValue] = useState("");

  // TODO: set함수 추가하기
  const [messages] = useState([]); // chatGPT와 사용자의 대화 메시지 배열
  const [isInfoLoading] = useState(false); // 최초 정보 요청시 로딩
  const [isMessageLoading] = useState(true); // 사용자와 메시지 주고 받을때 로딩
  const hadleChange = (event) => {
    const { value } = event.target;
    console.log("value==>", value);
    setValue(value);
  };

  const hadleSubmit = (event) => {
    event.preventDefault();
    console.log("메시지 보내기");
  };

  const saenInfo = async () => {
    // awiat 의 짝꿍 async. API 에서 데이터를 받아오기 전까지 멈춰주는 함수
    console.log("🚀 ~ saenInfo ~ endpoint:", endpoint);
    try {
      // API 호출
      const response = await fetch(`${endpoint}/recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredientList }),
      });

      // JSON 형식을 다시 자바스크립트 객체로 변환
      const result = await response.json();
      console.log("🚀 ~ saenInfo ~ result:", result);

      if (!result.data) return;
      // UI작업
    } catch (error) {
      // 에러처리 구문 작성
      console.error(error);
    }
  };

  // 페이지 진입 시 딱 한번 실행 - logic 가장 하단에 작성해주는 것이 좋음.
  useEffect(() => {
    console.log("ingredientList", ingredientList);
    saenInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {isInfoLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-70">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MoonLoader color="#46A195" />
          </div>
        </div>
      )}

      {/* START: 로딩 스피너 */}
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-chef-green-500">
          <span className="block text-xl text-center text-white">
            맛있는 쉐프
          </span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} isLoading={isMessageLoading} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form
            id="sendForm"
            className="w-full px-2 h-full"
            onSubmit={hadleSubmit}
          >
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={hadleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-chef-green-500 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center"
          >
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  );
};

export default Chat;
