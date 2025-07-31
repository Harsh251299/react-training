import { Component } from "react";
import { isEqual } from "lodash";

class CourseItem extends Component {
  render() {
    const { department, courses, faculty } = this.props.courseItem;
    console.log(`${department} rendered`);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "10px",
          padding: "15px",
        }}
      >
        <div>
          <h3>Department: {department}</h3>
        </div>
        <div>
          <h4>Courses: </h4>
          <ul>
            {courses.map((item) => (
              <li key={item.code}>
                Code: {item.code}, Title: {item.title}, Credis: {item.credits}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Faculty: </h4>
          <p>
            Chair: {faculty.chair}, Office: {faculty.office}
          </p>
        </div>
      </div>
    );
  }
  shouldComponentUpdate(nextProps) {
    if (isEqual(this.props.courseItem, nextProps.courseItem)) {
      return false;
    }
    return true;
  }
}

export default CourseItem;
