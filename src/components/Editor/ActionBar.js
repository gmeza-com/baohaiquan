export default function ActionBar({ onClick, isShow, isDisabled }) {
  return (
    <>
      {isShow && (
        <div className="flex w-full justify-end mb-6">
          <button
            onClick={onClick}
            isDisabled={isDisabled}
            variant="light"
            className="underline font-medium"
            type="button"
          >
            Tiếp tục
          </button>
        </div>
      )}
    </>
  );
}
