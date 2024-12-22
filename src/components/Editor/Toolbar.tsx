import React, { FC } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import ToolbarButton from "./ToolbarButton";
// import { HighlightButton } from "./HighlightButton";

interface ToolbarProps {
  wrapperClass?: string;
}

const Toolbar: FC<ToolbarProps> = ({
  wrapperClass = "",
}) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props} className="toolbar-tooltip">
      {/* <ToolbarButton icon={<i className="fa fa-bold" />} format="bold" /> */}
      <ToolbarButton icon={<i className="fa fa-image " />} format="image" />
      <ToolbarButton className="ml-2" icon={<i className="fa fa-image " />} format="image" />
      <ToolbarButton className="ml-2" icon={<i className="fa fa-image " />} format="image" />
      <ToolbarButton className="ml-2" icon={<i className="fa fa-image " />} format="image" />
      {/* <HighlightButton className="ml-2" /> */}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      trigger={["click"]}
      placement="right" // Position of the tooltip: top, right, bottom, left
      delay={{ show: 500, hide: 400 }} // Delay in showing/hiding tooltip
      overlay={renderTooltip} // Tooltip content
    >
      <i className={`fa fa-plus ${wrapperClass}`} />
    </OverlayTrigger>
  );
};

export default Toolbar;