"use client";
import { useState } from "react";
import CancelPopup from "./cancel-popup";
interface CancelPopupProps {
  selectedplanUid?: string | "";
}
function CancelAction({ selectedplanUid }: CancelPopupProps) {
  console.log(selectedplanUid, "selectedplanUid");

  const [modalOpen, setModalOpen] = useState(false);
  const OnPopup = () => {
    setModalOpen(true);
  };
  const OffPopup = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button
        className="!min-h-[auto] w-[120px] rounded-[45px] border border-[#fff] px-4 py-1 text-center !text-[12px] text-white transition-all duration-150 hover:bg-blue-600"
        onClick={OnPopup}
      >
        Cancel Plan
      </button>
      <CancelPopup
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        OffPopup={OffPopup}
        selectedplanUid={selectedplanUid}
        // onCancelCosmeticPlan={onCancelCosmeticPlan}
      />
    </div>
  );
}

export default CancelAction;
