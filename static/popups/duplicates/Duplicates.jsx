import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";

import { BouncerWrapper } from "../../BouncerWrapper";
import { closeChart } from "../../actions/charts";
import { dtypesUrl } from "../../actions/url-utils";
import { fetchJson } from "../../fetcher";

class ReactDuplicates extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, loadingReport: false };
    this.renderBody = this.renderBody.bind(this);
  }

  componentDidMount() {
    const { dataId } = this.props;
    this.setState({ loadingReport: true });
    fetchJson(`/dtale/duplicates/${dataId}`, duplicatesData => {
      this.setState({ loadingReport: false });
    });
  }

  renderBody() {
    return null;
  }

  render() {
    let error = null;
    if (this.state.error) {
      error = (
        <div className="row" style={{ margin: "0 2em" }}>
          <div className="col-md-12">{this.state.error}</div>
        </div>
      );
    }
    return (
      <React.Fragment>
        {error}
        <BouncerWrapper showBouncer={this.state.loadingReport}>{this.renderBody()}</BouncerWrapper>
      </React.Fragment>
    );
  }
}
ReactDuplicates.displayName = "ReactDuplicates";
ReactDuplicates.propTypes = {
  dataId: PropTypes.string.isRequired,
  chartData: PropTypes.shape({
    propagateState: PropTypes.func,
  }),
  onClose: PropTypes.func,
};

const ReduxDuplicates = connect(
  ({ dataId, chartData }) => ({ dataId, chartData }),
  dispatch => ({ onClose: chartData => dispatch(closeChart(chartData || {})) })
)(ReactDuplicates);
export { ReactDuplicates, ReduxDuplicates as Duplicates };
