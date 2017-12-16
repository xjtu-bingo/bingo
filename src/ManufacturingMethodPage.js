import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {Grid} from "material-ui";
import MothodPaper from './Components/Paper';
import ExpansionPanel from'./Components/ExpansionPanel';
const styles = theme => ({
    root: {
        margin: "auto",
        width: '80%',
    },
    panel: {
        margin: "auto",
        width: "90%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

class ControlledExpansionPanels extends Component {
    state = {
        expanded: 'panel1',
    };
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid xs={6} sm={6}>
                        <ExpansionPanel heading="奶茶" secondaryHeading="台式奶茶">
                            <ol>
                                <li>175ml红茶+100ml植脂末奶+10ml果糖（一下）+125ml热水或冰</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml果糖（一下）+175ml红茶+125ml热水或冰+搅拌机搅匀</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="黑糖奶茶">
                            <ol>
                                <li>175ml红茶+100ml植脂末奶+10ml黑糖（一下）+125ml热水或冰</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml黑糖（一下）+175ml红茶+125ml热水或冰+搅拌机搅匀</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="玫瑰奶茶">
                            <ol>
                                <li>台式+一塑料勺玫瑰酱+过滤（不加果糖）</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="抹茶奶茶">
                            <ol>
                                <li>台式+一平钢勺抹茶粉</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="招牌鲜奶">
                            <ol>
                                <li>70ml牛奶+三塑料勺三花植脂末+20ml果糖（两下）+150ml红茶+150ml热水，搅拌机搅拌</li>
                                <li>70ml牛奶+三塑料勺三花植脂末+20ml果糖（两下）+175ml红茶+125ml冰，搅拌机搅拌</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="鸳鸯奶茶">
                            <ol>
                                <li>一份半浓度Expresso（咖啡豆一半量+水正常量）+140ml红茶+80ml植脂末奶+100ml热水或冰+10ml果糖（一下）</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="椰风奶茶">
                            <ol>
                                <li>三塑料勺三花植脂末+两塑料勺椰粉+10ml果糖（一下）+175ml红茶+175ml热水或冰</li>
                            </ol>
                        </ExpansionPanel>
                        <ExpansionPanel heading="奶茶" secondaryHeading="巧克力奶茶">
                            <ol>
                                <li>台式+一平勺巧克力酱（不加果糖） 注：小料加珍珠/鲜芋时，只加5ml果糖（半下）</li>
                            </ol>
                        </ExpansionPanel>
                    </Grid>
                    <Grid xs={6} sm={6}>
                        <MothodPaper category="台式（原味）奶绿" >
                            <ol>
                                <li>200ml绿茶+100ml植脂末奶+10ml果糖（一下）+100ml热水</li>
                                <li>175ml绿茶+100ml植脂末奶+10ml果糖（一下）+125ml冰</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml果糖（一下）+200ml绿茶+100ml热水+搅拌机搅匀</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml果糖（一下）+175ml绿茶+125ml冰+搅拌机搅匀</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="黑糖奶绿" >
                            <ol>
                                <li>200ml绿茶+100ml植脂末奶+10ml黑糖（一下）+100ml热水</li>
                                <li>175ml绿茶+100ml植脂末奶+10ml黑糖（一下）+125ml冰</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml黑糖（一下）+200ml绿茶+100ml热水+搅拌机搅匀</li>
                                <li>5ml炼乳（一银勺）+4塑料勺植脂末+10ml黑糖（一下）+175ml绿茶+125ml冰+搅拌机搅匀</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="玫瑰奶绿" >
                            <ol>
                                <li>台式+一塑料勺玫瑰酱+过滤（不加果糖)注：小料加珍珠/鲜芋时，只加5ml果糖（半下）</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="金桔柠檬" >
                            <ol>
                                <li>3下金桔柠檬+1下果糖+直饮水或冰至400ml(只做冰/去冰)</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="美式咖啡" >
                            <ol>
                                <li>一份Expresso+160ml热水+一包太古糖+一个奶脂球</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="拿铁" >
                            <ol>
                                <li>120ml牛奶加热30s+一份Expresso+一包太古糖</li>
                            </ol>
                        </MothodPaper>
                        <MothodPaper category="卡布奇诺" >
                            <ol>
                                <li>100ml牛奶加热30s+一份Expresso+一包太古糖</li>
                            </ol>
                        </MothodPaper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default withStyles(styles)(ControlledExpansionPanels);