"use client";
import NumberTicker from "@/components/magicui/number-ticker";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";
import { updateQuestionsSolved } from "../_actions/actions";
import { debounce } from "lodash";
import toast from "react-hot-toast";

const updateSolvedHandler = debounce(async (userId, solved) => {
  await updateQuestionsSolved(userId, solved);
}, 1200);

export default function QuestionsSolved() {
  const { user } = useAuth();
  const router = useRouter();
  if (!user) router.replace("/signin");
  const [solved, setSolved] = React.useState(user?.questionsSolved || 0);

  useEffect(() => {
    if (user) {
      updateSolvedHandler(user.id, solved);
    }
  }, [solved, user]);

  const decrement = () => {
    if (solved == 0) return;
    setSolved((prevSolved) => prevSolved - 1);
    //eslint-disable-next-line
  };

  const increment = () => {
    setSolved((prevSolved) => prevSolved + 1);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <button
        className="z-[9] cursor-pointer rounded-lg bg-primary px-4 py-2 text-lg font-semibold text-white"
        onClick={decrement}
      >
        -
      </button>
      {solved ? (
        <NumberTicker value={solved} className="text-5xl font-black" />
      ) : (
        <span className="text-5xl font-black">0</span>
      )}
      <button
        onClick={increment}
        className="z-[9] cursor-pointer rounded-lg bg-primary px-4 py-2 text-lg font-semibold text-white"
      >
        +
      </button>
    </div>
  );
}
