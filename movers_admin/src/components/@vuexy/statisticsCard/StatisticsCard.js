import React from "react";
import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

class StatisticsCards extends React.Component {
  render() {
    return (
      <Card {...this.props.cardProps}>
        <CardBody
          className={`${
            this.props.className ? this.props.className : "stats-card-body"
          } d-flex ${
            !this.props.iconLeft && !this.props.hideChart
              ? "flex-column align-items-start"
              : this.props.iconLeft
              ? "flex-row align-items-center"
              : this.props.hideChart && !this.props.iconLeft
              ? "justify-content-center flex-column text-center"
              : null
          } ${!this.props.hideChart ? "pb-0" : "pb-2"} pt-2`}
        >
          <div className="icon-section">
            <div
              className={`avatar avatar-stats p-50 m-0 ${
                this.props.iconBg
                  ? `bg-rgba-${this.props.iconBg}`
                  : "bg-rgba-primary"
              }`}
            >
              <div className="avatar-content">{this.props.icon}</div>
            </div>
          </div>
          <div
            className={"title-section " + (this.props.iconLeft ? "ml-2" : "")}
          >
            <h2 className="text-bold-600 mb-25">{this.props.stat}</h2>
            <p className="mb-0">{this.props.statTitle}</p>
          </div>
        </CardBody>
        {!this.props.hideChart && (
          <Chart
            options={this.props.options}
            series={this.props.series}
            type={this.props.type}
            height={this.props.height ? this.props.height : 100}
          />
        )}
      </Card>
    );
  }
}
export default StatisticsCards;
