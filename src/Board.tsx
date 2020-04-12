import React, { FunctionComponent } from "react";
import { Icon, useIconContext } from "./Icon";

export const Board: FunctionComponent<{}> = () => {
  const { activeIcon } = useIconContext();

  return <Icon kind={activeIcon} />;
};
