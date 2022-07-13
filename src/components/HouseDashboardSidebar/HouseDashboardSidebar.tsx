import React from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  Chip,
  Icon,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Map, Navigation, People } from "@mui/icons-material";
import { TRootState } from "../../redux/store";
import { selectedHouseSelector } from "../../redux/houses";
import {
  THouseDashboardSidebarProps,
  THouseDashboardSidebarStateProps,
} from "./HouseDashboardSidebar.types";
import TextSkeleton from "../../ui/TextSkeleton/TextSkeleton";
import useHouseDashboardSidebar from "./useHouseDashboardSidebar";
import { HouseDashboardSidebarMapImage } from "./HouseDashboardSidebar.styled";
import { TApiUser } from "../../helpers/api/types/entities.types";

const HouseDashboardSidebar: React.FC<THouseDashboardSidebarProps> = (
  props: THouseDashboardSidebarProps
): React.ReactElement => {
  const { selectedHouse } = props;

  const { mapImageUrl, addressInfo } = useHouseDashboardSidebar(props);

  return (
    <Card>
      <CardContent>
        <Stack direction={"column"} spacing={3}>
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} spacing={1}>
              <Icon>
                <Map />
              </Icon>
              <Typography variant={"h5"}>Geography</Typography>
            </Stack>
            {mapImageUrl && selectedHouse ? (
              <a
                href={`https://www.google.com/maps/place/${selectedHouse.location.coordinates[0]},${selectedHouse.location.coordinates[1]}`}
                target={"_blank"}
                rel={"noreferrer nofollow"}
              >
                <HouseDashboardSidebarMapImage
                  src={mapImageUrl}
                  duration={0}
                  showLoading={false}
                  errorIcon={false}
                  wrapperStyle={{
                    width: "100%",
                    height: "0",
                    position: "relative",
                    display: "block",
                    paddingBottom: "50%",
                  }}
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                  }}
                />
              </a>
            ) : (
              <Skeleton
                variant={"rectangular"}
                animation={"wave"}
                sx={{
                  width: "100%",
                  height: "0",
                  position: "relative",
                  display: "block",
                  paddingBottom: "50%",
                }}
              />
            )}
            <Stack direction={"row"} alignItems={"flex-start"} spacing={2}>
              <Typography variant={"body1"}>
                {addressInfo ? (
                  addressInfo.properties.display_name
                ) : (
                  <TextSkeleton variant={"text"} animation={"wave"} />
                )}
              </Typography>
              {selectedHouse && (
                <IconButton
                  color={"primary"}
                  href={`https://www.google.com/maps/place/${selectedHouse.location.coordinates[0]},${selectedHouse.location.coordinates[1]}`}
                  target={"_blank"}
                  rel={"noreferrer nofollow"}
                >
                  <Navigation />
                </IconButton>
              )}
            </Stack>
          </Stack>
          {selectedHouse && (
            <Stack
              direction={"column"}
              spacing={selectedHouse.members.length ? 2 : 0}
            >
              <Stack direction={"row"} spacing={1}>
                <Icon>
                  <People />
                </Icon>
                <Typography variant={"h5"}>
                  {selectedHouse.members.length
                    ? `${selectedHouse.members.length} Member${
                        selectedHouse.members.length > 1 ? "s" : ""
                      }`
                    : "No Members"}
                </Typography>
              </Stack>
              <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
                {selectedHouse.members.map((member: TApiUser) => (
                  <Chip key={member.id} label={`${member.email}`} />
                ))}
              </Stack>
            </Stack>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (
  state: TRootState
): THouseDashboardSidebarStateProps => ({
  selectedHouse: selectedHouseSelector(state),
});
export default connect(mapStateToProps)(HouseDashboardSidebar);
