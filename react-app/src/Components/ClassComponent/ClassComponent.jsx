import { Component } from "react";
import CourseItem from "./CourseItem";
import cloneDeep from "lodash/cloneDeep";

// Ways to do Shallow Copy:-
//     1) Object.assign({}, obj)
//     2) Using Spread operator {...obj}
//     3) Using slice method

const courseCatalog = [
  {
    department: "Computer Science",
    courses: [
      { code: "CS101", title: "Intro to Programming", credits: 3 },
      { code: "CS201", title: "Data Structures", credits: 4 },
    ],
    faculty: {
      chair: "Dr. Smith",
      office: "Room 101",
    },
  },
  {
    department: "Mathematics",
    courses: [
      { code: "MATH101", title: "Calculus I", credits: 4 },
      { code: "MATH201", title: "Linear Algebra", credits: 3 },
    ],
    faculty: {
      chair: "Dr. Allen",
      office: "Room 202",
    },
  },
];

class ClassComponent extends Component {
  state = {
    catalog: [...courseCatalog],
  };
  changeDeptName = () => {
    const newCatalog = structuredClone(this.state.catalog);
    const mathdept = newCatalog.find((d) => d.department === "Mathematics");
    mathdept.department = "Applied Math";
    this.setState({
      catalog: newCatalog,
    });
  };
  addCourse = () => {
    const newCourse = { code: "CS301", title: "Algorithms", credits: 4 };
    const newCatalog = this.state.catalog.map((dept) =>
      dept.department === "Computer Science"
        ? { ...dept, courses: [...dept.courses, newCourse] }
        : dept
    );
    this.setState({
      catalog: newCatalog,
    });
  };
  removeLinearAlgebra = () => {
    const newCatalog = JSON.parse(JSON.stringify(this.state.catalog));
    const mathDept = newCatalog.find(
      (dept) => dept.department === "Mathematics"
    );
    mathDept.courses = mathDept.courses.filter(
      (course) => course.title != "Linear Algebra"
    );
    this.setState({
      catalog: newCatalog,
    });
  };
  changeRoom = () => {
    const newCatalog = cloneDeep(this.state.catalog);
    const csDept = newCatalog.find((d) => d.department === "Computer Science");
    csDept.faculty.office = "Room 111";
    this.setState({
      catalog: newCatalog,
    });
  };
  render() {
    return (
      <>
        <h1>Class Component Homework - 07/30</h1>
        <ul style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {this.state.catalog.map((course) => (
            <CourseItem key={course.department} courseItem={course} />
          ))}
        </ul>
        <div style={{ margin: "10px" }}>
          <label>Change Mathematics Dept. Name to Applied Math </label>
          <button onClick={this.changeDeptName}>Change Dept. name</button>
        </div>
        <div style={{ margin: "10px" }}>
          <label>Add New Course to CS Dept.</label>
          <button onClick={this.addCourse}>Add Course</button>
        </div>
        <div style={{ margin: "10px" }}>
          <label>Remove Linear Algebra from Mathematics. </label>
          <button onClick={this.removeLinearAlgebra}>
            Remove Linear Algebra
          </button>
        </div>
        <div style={{ margin: "10px" }}>
          <label>Change "Dr. Smith"s office to Room 111. </label>
          <button onClick={this.changeRoom}>Change room</button>
        </div>
      </>
    );
  }
}
export default ClassComponent;
