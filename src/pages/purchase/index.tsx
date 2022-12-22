import { useRouter } from "next/router";
import { useEffect } from "react";
import { Seat } from "../../hooks/useSeats";

function Purchase() {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.seats) {
      router.push("/");
    }
  }, [router]);

  // 타입 단언 const assertion
  const seats: Seat[] = JSON.parse(router.query.seats as unknown as string);

  return (
    <div>
      {seats.length}개 선택하셨습니다. 좌석은 {seats[0].name} 입니다.
    </div>
  );
}

export default Purchase;
