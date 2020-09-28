import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import PolicyIcon from "@material-ui/icons/Policy";
import SecurityIcon from '@material-ui/icons/Security';
import UserManagementIcon from '@material-ui/icons/SupervisedUserCircle';
import { Link as RouterLink } from "react-router-dom";

import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

import policies from "../data/policies";

const getIconForFeature = (feature) => {
	switch (feature) {
		case 'security-policy':
			return <SecurityIcon />
		case 'user-management':
			return <UserManagementIcon />
	}
}
const remove = (array, item) => {
  const index = array.indexOf(item);
  array.splice(index, 1);
};

const useStyles = makeStyles((theme) => ({
  badges: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  breadcrumbItem: theme.palette.breadcrumbItem,
  breadcrumbLink: theme.palette.breadcrumbLink,
}));

const Policieshape = PropTypes.shape({
  groupname: PropTypes.string,
});

const POLICY_TABLE_COLUMNS = [
  { id: "policyname", key: "Name" },
  { id: "features", key: "Features" },
];

const FormattedGroupType = (props) => {
  switch (props.provider) {
    case "local":
      return "Local";
    default:
      return props.provider || "";
  }
};

const Policies = (props) => {
  const classes = useStyles();
  const {
    /* policies, */ onDeletePolicy,
    onSelectPolicy,
    onSort,
    sortBy,
    sortDirection,
  } = props;

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink className={classes.breadcrumbLink} to="/">Home</RouterLink>
        <RouterLink className={classes.breadcrumbLink} to="/security">Security</RouterLink>
        <Typography className={classes.breadcrumbItem} color="textPrimary">Policies</Typography>
      </Breadcrumbs>
      <br />
	  { policies && policies.length > 0 ? 
	  <div>
      <Hidden xsDown implementation="css">
	  <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {POLICY_TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={sortBy === column.id ? sortDirection : false}
                >
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortDirection}
                    onClick={() => onSort(column.id)}
                  >
                    {column.key}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {policies.map((policy) => (
              <TableRow
                hover
                key={policy.policyName}
                onClick={() => onSelectPolicy(policy.policyName)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  {policy.policyName}
                </TableCell>
                {/* <TableCell>{moment(group.lastModified).fromNow()}</TableCell> */}
                <TableCell className={classes.badges}>
                  {policy.features.map((feature) => (
                    <Chip
					  size="small"
                      icon={ getIconForFeature(feature.name) }
                      label={feature.name}
                      onDelete={(event) => {
                        event.stopPropagation();
                      }}
                      color="secondary"
                    />
                  ))}
                </TableCell>
                <TableCell align="right">
                      <IconButton
						size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeletePolicy(policy.policyName);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
						size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeletePolicy(policy.policyName);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Hidden>
      <Hidden smUp implementation="css">
		  <Paper>
        <List className={classes.root}>
          {policies.map((policy) => (
            <React.Fragment>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <span>
                      {policy.policyName}
                    </span>
                  }
                  //   secondary={
                  //     <React.Fragment>
                  //       <Typography
                  //         component="span"
                  //         variant="body2"
                  //         className={classes.inline}
                  //         color="textPrimary"
                  //       >
                  //         Policy details
                  //       </Typography>
                  //     </React.Fragment>
                  //   }
                />
                <ListItemSecondaryAction>
                  <IconButton
				  	edge="end" 
					size="small"
					aria-label="edit"
				>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
				  	edge="end" 
					size="small"
					aria-label="delete"
				>
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
		</Paper>
      </Hidden>
	  </div>
		:
		<div>No policies found</div>
		}
	  <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
};

Policies.propTypes = {
  Policies: PropTypes.arrayOf(Policieshape).isRequired,
  sortBy: PropTypes.string,
  sortDirection: PropTypes.string,
  onDeletePolicy: PropTypes.func.isRequired,
  onSelectPolicy: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

Policies.defaultProps = {
  sortBy: undefined,
  sortDirection: undefined,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Policies);
