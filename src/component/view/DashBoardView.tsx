import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";

import { Table } from "@/component/ui";
import HeaderFilter from "./HeaderFilter";
import LoadingTemplate from "../template/LoadingTemplate";

import { getPersonsApi } from "@/util/api";
import useSearchStore from "@/store/useSearchStore";
import useGenderStore from "@/store/useGenderStore";
import useDateStore from "@/store/useDateStore";

import { EXCEPTION_SEARCH_FILTER } from "@/util/constant";

import type { TGender, TPerson } from "@/model/person";

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
  }, [isLoading, hasMore]);

  const fetchFilteredData = async (filterParams: {
    gender?: TGender;
    selectedDate?: Date;
  }) => {
    setIsLoading(true); // 로딩 시작
    setHasMore(true); // 추가 데이터 가능 상태로 초기화
    setCount(100); // 초기 데이터 개수

    try {
      // 기존 데이터 초기화
      setPersons([]);

      // API 호출
      const response = await getPersonsApi({
        quantity: 100,
        gender: filterParams.gender || gender,
        startDate: filterParams.selectedDate
          ? filterParams.selectedDate.toISOString().split("T")[0]
          : "2005-01-01",
      });

      // 결과 데이터 설정
      setPersons(
        response.map((person) => ({
          ...person,
          isSelect: false,
          name: `${person.firstname} ${person.lastname}`,
        }))
      );
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

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

  // 성별 필터 api 라이플사이클
  useEffect(() => {
    fetchFilteredData({ gender, selectedDate: selectedDate || undefined });
  }, [gender]);

  // 날짜 필터 api 라이플사이클
  useEffect(() => {
    if (!selectedDate) return;
    fetchFilteredData({ gender: gender || "", selectedDate: selectedDate });
  }, [selectedDate]);

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
