import { useMemo, useState } from "react";

// export를 앞에 붙이면 다른 데에서 쓸 수 있다.
export type SeatState = "unoccupied" | "selected" | "occupied";

// 좌석들을 상태로 갖고 있을 것이다.
export interface Seat {
  id: string; // 고유한 값
  name: string; // A1, H2, ...
  state: SeatState; // unoccupied, selected, occupied
}

const mockSeats: Seat[] = [];

// Array(15)는 빈 배열 15개를 만드는 것
// [...Array(15).keys()].map()
// Array.from(Array(15).keys()).map();

// 얘는 반환하는 건 없고 반복만 돈다
// 15개짜리 0부터 14의 배열을 만들고 그걸 반복을 돈다? 여기까지 쓴건.
Array.from(Array(15).keys()).forEach((index) => {
  // 백틱으로 그그 랜덤한 값 들어가게 하는거?
  mockSeats.push({ id: `${index}`, name: `A${index}`, state: "unoccupied" });
});

mockSeats[1].state = "occupied";

// 관련된 로직을 한 곳에 담고 추상화를 한다.
function useSeats() {
  // Seat의 배열일 것이다 저 Seat 오브젝트가 여러개 있을 것이기 때문
  const [seats, setSeats] = useState<Seat[]>(mockSeats); // 타입이 동일하기 때문에 초기값을 넣어도 오류 X

  // state 선언
  // onClickSeat 호출될 때 처리 or
  // useEffect 이용

  // seats가 바뀔 때 렌더링 되는데 그냥 변수로 해도 되지 않을까?
  // useMemo를 쓸 수 있지 않을까?

  const selectedSeats = useMemo(() => {
    // mdn array filter
    // return이 true면 객체 반환 (고차 함수) map filter reducer ... etc
    return seats.filter((eachSeat) => eachSeat.state === "selected");
  }, [seats]);

  const onClickSeat = (clickedSeat: Seat) => {
    // 리팩토링
    // TODO: 여기 리팩토링 가능할듯?
    // * 이거 좀 중요
    // ? Yo
    // ! Yo
    setSeats((prev) => {
      return prev.map((eachSeat) =>
        eachSeat.id === clickedSeat.id
          ? {
              id: eachSeat.id,
              name: eachSeat.name,
              state: eachSeat.state === "selected" ? "unoccupied" : "selected",
            }
          : {
              id: eachSeat.id,
              name: eachSeat.name,
              state: eachSeat.state,
            }
      );
    });
  };
  return { seats, onClickSeat, selectedSeats };
}

export default useSeats;
