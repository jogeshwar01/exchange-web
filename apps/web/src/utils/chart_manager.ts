import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  LineStyle,
  UTCTimestamp,
} from "lightweight-charts";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private lastUpdateTime: number = 0;
  private chart: any;

  constructor(
    ref: any,
    initialData: any[],
    layout: { background: string; color: string }
  ) {
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "#707070",
          width: 1,
          style: LineStyle.LargeDashed,
        },
        horzLine: {
          color: "#707070",
          width: 1,
          style: LineStyle.LargeDashed,
        },
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
        borderVisible: true,
        borderColor: "#555",
        textColor: "#fff",
      },
      grid: {
        horzLines: {
          visible: true,
          color: "#101a27",
        },
        vertLines: {
          visible: true,
          color: "#101a27",
        },
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white", // White text for better readability
      },
      timeScale: {
        borderColor: "#555",
      },
    });

    // Create the Candlestick Series with custom colors
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#34cb88", // Green color for bullish candles
      downColor: "#ff615c", // Red color for bearish candles
      borderVisible: false,
      wickUpColor: "#5dd5a0",
      wickDownColor: "#ff887f",
    });

    this.chart = chart;
    this.candleSeries = candleSeries;

    this.candleSeries.setData(
      initialData.map((data) => ({
        ...data,
        time: (data.timestamp / 1000) as UTCTimestamp,
      }))
    );
  }
  public update(updatedPrice: any) {
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = new Date().getTime();
    }

    this.candleSeries.update({
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      close: updatedPrice.close,
      low: updatedPrice.low,
      high: updatedPrice.high,
      open: updatedPrice.open,
    });

    if (updatedPrice.newCandleInitiated) {
      this.lastUpdateTime = updatedPrice.time;
    }
  }
  public destroy() {
    this.chart.remove();
  }
}
