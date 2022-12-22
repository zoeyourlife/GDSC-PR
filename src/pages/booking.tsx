// 요구사항
// 1. 좌석들을 렌더링
// 1-1 좌석 상태?
//
// 2. 좌석들을 선택할 수 있어야 되고
// 2-2. 좌석 선택한 결과
//
// 3. 영화들을 선택할 수 있어야되고
// 4. 좌석의 수와 영화 가격을 기준으로 보여줘야 되고
// 5. 결제 화면으로 보내야 되고

import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useMovie from "../hooks/useMovie";
import useSeats, { SeatState } from "../hooks/useSeats";

function Booking() {
  // 구조 분해 할당
  // 대수적 효과
  const { seats, onClickSeat, selectedSeats } = useSeats();
  const { currentMovie } = useMovie();

  const router = useRouter();

  const onClickPurchase = () => {
    router.push({
      pathname: " /purchase",
      query: {
        seats: JSON.stringify(selectedSeats),
        movie: JSON.stringify(currentMovie),
      },
    });
  };

  //   console.log(seats);
  //   console.log(selectedSeats);

  return (
    <div>
      <h2>
        현재 영화 : {currentMovie.name}, 가격: {currentMovie.price}
      </h2>
      {seats.map((eachSeat) => (
        <StyledSeatButton
          key={eachSeat.id}
          // onClick{onClickSeat} 이런 식으로 들어가면 안된다.
          onClick={() => onClickSeat(eachSeat)}
          state={eachSeat.state}
          disabled={eachSeat.state === "occupied"}
        >
          {eachSeat.name}
        </StyledSeatButton>
      ))}

      <h2>{selectedSeats.length}개 선택했어요</h2>

      <button onClick={onClickPurchase}>결제하기</button>
    </div>
  );
}

export default Booking;

// styeld에 인자를 받을 수 있게
// 자바스크립트에있는 변수를 css에 받을 수 있다
const StyledSeatButton = styled.button<{ state: SeatState }>`
  /* and */
  // 삼항 연산자로도 가능하지만 너무 많아지면 지저분해짐 -> 이런 스타일로
  // if 문 축약해서 쓴것 ?
  ${({ state }) => state === "unoccupied" && unoccupiedStyle}
  ${({ state }) => state === "selected" && selectedStyle}
  ${({ state }) => state === "occupied" && occupiedStyle}
`;

const occupiedStyle = css`
  background-color: red;
`;

const selectedStyle = css`
  background-color: blue;
`;

const unoccupiedStyle = css`
  background-color: green;
`;
