import React, { Component } from "react";
import axios from "axios";
import "../SharedStyles.scss";
import { baseApi, baseUrl, coverSize, coversUrl } from "../Utils/Constants";
import CoverCarousel from "../Components/CoverCarousel";
import Chart from "../Components/Chart";
import TextInput from "../Components/TextInput";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      totalResults: null,
      currentResults: 0,
      data: {},
      chartData: null,
      page: 1,
      covers: [],
      loading: "idle",
    };
  }

  handleQueryChange = (event) => {
    event.preventDefault();
    this.setState({
      query: event.target.value,
    });
  };

  getFromApi = (event, page, reset) => {
    event.preventDefault();
    if (reset) {
      this.setState({
        currentResults: 0,
        covers: [],
      });
    }
    this.setState({ loading: "loading" });
    axios
      .get(baseApi, {
        params: { q: this.state.query, page: page },
      })
      .then((res) => {
        if (res) {
          const totalResults = res.data.numFound;
          const docs = page === 1 ? {} : this.state.data;
          let currentResults = this.state.currentResults;

          if (totalResults > 0) {
            res.data.docs.forEach((doc) => {
              currentResults += 1;
              const decade = parseInt(doc.first_publish_year / 10, 10) * 10;
              const docObj = {
                title: doc.title,
                author: doc.author_name ? doc.author_name[0] : "Unknown",
                year: doc.first_publish_year,
                link: baseUrl + doc.key,
                coverId: doc.cover_i
                  ? coversUrl + doc.cover_i + coverSize
                  : null,
              };

              if (!decade) {
                if (docs["Unknown"]) {
                  docs["Unknown"].push(docObj);
                } else {
                  docs["Unknown"] = [docObj];
                }
              } else {
                if (docs[decade]) {
                  docs[decade].push(docObj);
                } else {
                  docs[decade] = [docObj];
                }
              }
            });
          }

          this.setState(
            {
              currentResults,
              totalResults,
              data: docs,
              page,
            },
            () => this.setChartData()
          );
        }
      })
      .finally(() => this.setState({ loading: "idle" }));
  };

  getMoreData = (event) => {
    this.getFromApi(event, this.state.page + 1);
  };

  setChartData = () => {
    const data = this.state.data;
    const chartData = [];

    for (const [key, value] of Object.entries(data)) {
      chartData.push({
        name: String(key),
        results: value.length,
      });
    }

    this.setState({ chartData });
  };

  handleChartClick = (data) => {
    const covers = this.state.data[data.payload.name];
    this.setState({ covers });
  };

  render() {
    return (
      <div className="homeContainer">
        <h6>OpenLibrary Search by Nabeel Asghar</h6>

        <TextInput
          onSubmit={(e) => this.getFromApi(e, 1, true)}
          value={this.state.query}
          onChange={this.handleQueryChange}
          buttonState={this.state.loading}
          chartData={this.state.chartData}
          onSubmit1={(e) => this.getMoreData(e)}
          currentResults={this.state.currentResults}
          totalResults={this.state.totalResults}
        />

        <div className={"graph-container"}>
          <Chart
            chartData={this.state.chartData}
            handleChartClick={this.handleChartClick}
          />
        </div>

        <CoverCarousel covers={this.state.covers} />
      </div>
    );
  }
}

export default Home;
