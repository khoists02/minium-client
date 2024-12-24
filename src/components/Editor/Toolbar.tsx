import React, { FC } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ToolbarButton from "./ToolbarButton";
// import { HighlightButton } from "./HighlightButton";

interface ToolbarProps {
  wrapperClass?: string;
  onSelect: (format: string) => void;
}

const Toolbar: FC<ToolbarProps> = ({
  onSelect,
  wrapperClass = "",
}) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="toolbar-tooltip">
      <ToolbarButton onClick={() => onSelect("image")} icon={<i className="fa fa-image " />} format="image" />
      <ToolbarButton onClick={() => onSelect("code-block")} className="ml-2" icon={<i className="fa fa-code " />} format="code-block" />
      <ToolbarButton onClick={() => onSelect("quote")} className="ml-2" icon={<i className="fa fa-quote-right " />} format="quote" />
    </Tooltip>
  );

  return (
    <OverlayTrigger
      trigger={["click"]}
      placement="right" // Position of the tooltip: top, right, bottom, left
      delay={{ show: 500, hide: 400 }} // Delay in showing/hiding tooltip
      overlay={renderTooltip} // Tooltip content
      rootClose
      rootCloseEvent="mousedown"
    >
      <i className={`fa fa-plus ${wrapperClass}`} />
    </OverlayTrigger>
  );
};

export default Toolbar;