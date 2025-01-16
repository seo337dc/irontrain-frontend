import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

import { Table } from "@/ui";
import HeaderFilter from "./HeaderFilter";
import LoadingTemplate from "./template/LoadingTemplate";

import { getPersonsApi } from "@/util/api";
import useSearchStore from "@/store/useSearchStore";
import useGenderStore from "@/store/useGenderStore";
import useDateStore from "@/store/useDateStore";

import { EXCEPTION_SEARCH_FILTER } from "@/util/constant";

import type { TPerson } from "@/model/person";

const DashBoardView = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { searchText } = useSearchStore();
  const { gender } = useGenderStore();
  const { selectedDate } = useDateStore();

  const [persons, setPersons] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  // fetch api
  const fetchData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await getPersonsApi({
        quantity: count,
        gender,
        startDate: selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : "2005-01-01",
      });

      if (response.length === 0) {
        setHasMore(false);
      } else {
        const resultPersons: TPerson[] = response.map((person) => ({
          ...person,
          isSelect: false,
          name: `${person.firstname} ${person.lastname}`,
        }));

        setPersons((prev) => {
          const ids = new Set(prev.map((p) => p.id)); // 중복
          const filteredResults = resultPersons.filter(
            (person) => !ids.has(person.id) // 새 데이터 중 중복되지 않은 것만 추가
          );
          return [...prev, ...filteredResults];
        });
        setCount((prev) => prev + 10);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [gender, selectedDate, isLoading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          fetchData();
        }
      },
      {
        root: sectionRef.current || null,
        rootMargin: "100px", // 조기 로딩을 위한 여유 공간 설정
        threshold: 1.0, // 요소가 100% 보일 때 트리거
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [fetchData, hasMore, isLoading]);

  useEffect(() => {
    setHasMore(true);
    setCount(100);
    fetchData();
  }, [gender, selectedDate]);

  const filteredPersons = useMemo(() => {
    if (!searchText) return persons;

    return persons.filter((person) => {
      return Object.entries(person)
        .filter(([key]) => !EXCEPTION_SEARCH_FILTER.includes(key))
        .some(([, value]) =>
          String(value).toLowerCase().includes(searchText.toLowerCase())
        );
    });
  }, [persons, searchText]);

  return (
    <div className="pt-4">
      {isLoading && <LoadingTemplate />}

      <HeaderFilter />

      <div ref={sectionRef} className="relative overflow-y-auto h-[80vh]">
        <Table data={filteredPersons} />
        <div ref={observerRef} className="h-10" />
      </div>
    </div>
  );
};

export default DashBoardView;
