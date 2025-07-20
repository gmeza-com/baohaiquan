"use client";

import axios from "axios";
import { useEffect, useMemo, useState, useRef } from "react";
import DOMPurify from "isomorphic-dompurify";
import { IWidget } from "@/type/widget";

const ChuChayTrangChu = () => {
  const [data, setData] = useState<IWidget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [position, setPosition] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  
  // Cấu hình animation
  const SPEED = 0.7; // px/frame - có thể điều chỉnh tốc độ

  const content = useMemo(() => {
    return data?.content?.["vi"];
  }, [data]);

  /**
   * Animation logic
   * ====================================================================
   */

  const animate = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition - SPEED; // Tốc độ di chuyển (px/frame)
      
      // Reset position khi text đã di chuyển hết ra ngoài bên trái
      if (newPosition < -textWidth) {
        return containerWidth;
      }
      
      return newPosition;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (textWidth > 0 && containerWidth > 0) {
      setPosition(containerWidth); // Bắt đầu từ bên phải
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  /**
   * useEffect
   * ====================================================================
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await axios.get("/api/widget/homepage-banner");
        const data = response.data;

        setData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Cập nhật kích thước khi content thay đổi
  useEffect(() => {
    if (content && textRef.current && containerRef.current) {
      const updateDimensions = () => {
        const textElement = textRef.current;
        const containerElement = containerRef.current;
        
        if (textElement && containerElement) {
          setTextWidth(textElement.offsetWidth);
          setContainerWidth(containerElement.offsetWidth);
        }
      };

      // Cập nhật ngay lập tức
      updateDimensions();
      
      // Thêm listener cho resize
      const resizeObserver = new ResizeObserver(updateDimensions);
      if (textRef.current) {
        resizeObserver.observe(textRef.current);
      }
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [content]);

  // Bắt đầu animation khi có đủ thông tin
  useEffect(() => {
    if (textWidth > 0 && containerWidth > 0) {
      startAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [textWidth, containerWidth]);

  // Cleanup animation khi component unmount
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  /**
   * render view
   * ====================================================================
   */

  if (isLoading || isError) return null;

  if (!!data?.content && !content) return null;

  return (
    <div className="container overflow-hidden">
      <div 
        ref={containerRef}
        className="w-full relative"
        style={{ height: textRef.current?.offsetHeight || 'auto' }}
      >
        <div
          ref={textRef}
          className="absolute whitespace-nowrap select-none"
          style={{
            transform: `translateX(${position}px)`,
            willChange: 'transform',
            userSelect: 'none',
            pointerEvents: 'none'
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content as string),
          }}
        />
      </div>
    </div>
  );
};

export default ChuChayTrangChu;
