export function OpenOrders({ market }: { market: string }) {
  return (
    <div className="flex flex-col bg-baseBackgroundL1 rounded-lg p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="text-baseTextHighEmphasis font-medium">Open Orders</div>
      </div>
      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row items-center">
          <div className="text-baseTextMedEmphasis text-sm">Market</div>
          <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
            All
          </div>
          <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
            Open
          </div>
          <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
            Cancelled
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="text-baseTextMedEmphasis text-sm">Type</div>
          <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
            All
          </div>
          <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-baseBackgroundL2 hover:bg-baseBackgroundL3">
            Limit
          </div>
        </div>
      </div>
    </div>
  );
}
