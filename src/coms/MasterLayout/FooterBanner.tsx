"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { IWidget } from "@/type/widget";

const FooterBanner: React.FC = () => {
  const [data, setData] = useState<IWidget | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const content = useMemo(() => {
    return data?.content?.["vi"];
  }, [data]);

  /**
   * useEffect
   * ====================================================================
   */

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await axios.get(`/api/widget/footer-image`);
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

  /**
   * render view
   * ====================================================================
   */

  if (isLoading || isError) return null;

  if (!!data?.content && !content) return null;

  return (
    <div className="container mx-auto">
      <div
        className="footer-image"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content as string),
        }}
      />
    </div>
  );
};

export default FooterBanner;
