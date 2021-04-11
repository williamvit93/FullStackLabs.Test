import React, { Fragment } from "react"
import {
    Grid,
    Card,
    Typography,
    makeStyles
}
    from '@material-ui/core';
import colors from "../constants/colors";
import {formatValueMinimumThreeDigits} from '../utils/numberFormat';

const useStyles = makeStyles(() => ({
    status: ({ loading, error }) => {
        const color = loading
            ? colors.warning
            : error.length > 0
                ? colors.danger
                : colors.faded

        return {
            padding: '5px',
            backgroundColor: color
        };
    }
}));

const Status = ({ loading, error }) => {
    const classes = useStyles({ loading, error });

    if (!loading && error.length == 0)
        return <Fragment />

    return (
        <Grid item xs={12}>
            <Card variant="outlined" className={classes.status}>
                <Typography>
                    {loading ? "LOADING..." : error.length > 0 ? error : ""}
                </Typography>
            </Card>
        </Grid>
    )
}

const Blocks = ({ blocks }) => {
    const { loading, error } = blocks;
    const classes = useStyles({ loading, error });

    return (
        <Grid container spacing={3}>
            <Status loading={loading} error={error} />

            {blocks.list.map((block) => {
                return (
                    <Grid key={block.id} item xs={12}>
                        <Card variant="outlined" className={classes.status}>
                            <Typography variant="caption" color="primary">
                                {formatValueMinimumThreeDigits(block.id)}
                            </Typography>
                            <Typography>
                                {block.attributes.data}
                            </Typography>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    )
}


export default Blocks;

