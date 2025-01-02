"use client";
import { Loading } from "@/components/ui/Loading";
import { useGetCoursesQuery } from "@/state/api";
import { useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CourseCardSearch } from "@/components/CourseCardSearch";
import { SelectedCourse } from "@/app/(nondashboard)/search/SelectedCourse";

const Search = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("courseId");

  const router = useRouter();

  const { data: courses, isError, isLoading } = useGetCoursesQuery({});

  useEffect(() => {
    if (courses && id) {
      const course = courses.find((course) => course.courseId === id);
      if (course) {
        setSelectedCourse(course);
      } else {
        setSelectedCourse(courses[0]);
      }
    }
  }, [courses, id]);

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    router.push(`/search?courseId=${course.courseId}`);
  };

  const handleEnrollNow = () => {
    router.push(
      `/checkout?step=1&id=${selectedCourse?.courseId}&showSingUp=false`
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Failed fetching the course</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="search"
    >
      <h1 className="search__title">List of available courses</h1>
      <h2 className="search__subtitle">{courses?.length}</h2>
      <div className="search__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="search__courses-grid"
        >
          {courses?.map((item) => (
            <CourseCardSearch
              key={item.courseId}
              course={item}
              isSelected={selectedCourse?.courseId === item.courseId}
              onClick={() => handleCourseSelect(item)}
            />
          ))}
        </motion.div>
        {selectedCourse && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="search__selected-course"
          >
            <SelectedCourse
              course={selectedCourse}
              handleEnrollNow={handleEnrollNow}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;
