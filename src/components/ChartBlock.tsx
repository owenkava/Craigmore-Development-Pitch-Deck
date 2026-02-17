"use client";

import { memo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
} from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface CashflowData {
  quarter: string;
  inflow: number;
  outflow: number;
  cumulative: number;
}

interface ChartBlockProps {
  type: "pie" | "cashflow";
  title: string;
  data: PieChartData[] | CashflowData[];
  height?: number;
}

const formatCurrency = (val: number) => {
  if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(1)}M`;
  return `$${val}K`;
};

/**
 * Hook that defers rendering until the element is visible in the viewport.
 * Eliminates Recharts "width(-1) height(-1)" warnings from off-screen charts.
 */
function useIsVisible(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/**
 * Hook to measure the width of a container element for chart sizing.
 * Avoids ResponsiveContainer entirely — gives charts explicit px dimensions.
 */
function useContainerWidth(fallback = 500) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setWidth(w);
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { containerRef: ref, width };
}

function ChartBlock({
  type,
  title,
  data,
  height = 300,
}: ChartBlockProps) {
  const { ref: visRef, visible } = useIsVisible();
  const { containerRef, width: cashflowWidth } = useContainerWidth();

  return (
    <motion.div
      ref={visRef}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <h4 className="text-heading-md font-display font-semibold text-ink mb-6">
        {title}
      </h4>

      {type === "pie" && (
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-[280px] flex-shrink-0" style={{ height }}>
            {visible ? (
              <PieChart width={280} height={height} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Pie
                  data={data as PieChartData[]}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  animationBegin={200}
                  animationDuration={800}
                >
                  {(data as PieChartData[]).map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => formatCurrency((val as number) / 1000)}
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </PieChart>
            ) : (
              <div style={{ width: 280, height }} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            {(data as PieChartData[]).map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-body-sm text-ink-light">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "cashflow" && (
        <div ref={containerRef} className="w-full" style={{ height }}>
          {visible && cashflowWidth > 0 ? (
            <ComposedChart width={cashflowWidth} height={height} data={data as CashflowData[]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 12, fill: "#8a8a8a" }}
                axisLine={{ stroke: "#e5e5e5" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#8a8a8a" }}
                axisLine={{ stroke: "#e5e5e5" }}
                tickFormatter={(v) => `$${v}K`}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
                formatter={(val) => [`$${val}K`, ""]}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="inflow" fill="#2563eb" name="Inflows" radius={[4, 4, 0, 0]} />
              <Bar dataKey="outflow" fill="#e5e5e5" name="Outflows" radius={[4, 4, 0, 0]} />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#1a1a1a"
                strokeWidth={2}
                dot={{ r: 4, fill: "#1a1a1a" }}
                name="Cumulative"
              />
            </ComposedChart>
          ) : (
            <div style={{ width: "100%", height }} />
          )}
        </div>
      )}
    </motion.div>
  );
}

export default memo(ChartBlock);
