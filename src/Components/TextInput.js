import React from "react";
import ReactiveButton from "reactive-button";
import "../SharedStyles.scss";

function TextInput(props) {
  return (
    <div>
      <div className="form__group field">
        <form onSubmit={props.onSubmit}>
          <input
            type="input"
            className="form__field"
            placeholder="Name"
            name="name"
            id="name"
            required
            value={props.value}
            onChange={props.onChange}
          />
          <label htmlFor="name" className="form__label">
            Name
          </label>
          <ReactiveButton
            color="green"
            type={"submit"}
            idleText={"Submit"}
            style={{ borderRadius: "5px", margin: "15px 0px 0px 0px" }}
            size={"normal"}
            messageDuration={2000}
            width={"100%"}
            animation={true}
            buttonState={props.buttonState}
          />
        </form>
      </div>
      {props.chartData && (
        <div className="form__group field">
          <form onSubmit={props.onSubmit1}>
            <ReactiveButton
              color="dark"
              type={"submit"}
              idleText={`Get More Results ${props.currentResults} / ${props.totalResults}
              `}
              style={{ borderRadius: "5px", marginBottom: "30px" }}
              size={"normal"}
              messageDuration={2000}
              width={"100%"}
              animation={true}
              buttonState={props.buttonState}
              disabled={props.currentResults === props.totalResults}
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default TextInput;
