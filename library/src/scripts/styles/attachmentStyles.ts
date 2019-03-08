/*
 * @author Stéphane LaFlèche <stephane.l@vanillaforums.com>
 * @copyright 2009-2019 Vanilla Forums Inc.
 * @license GPL-2.0-only
 */

import { globalVariables } from "@library/styles/globalStyleVars";
import {
    borders,
    componentThemeVariables,
    allLinkStates,
    margins,
    unit,
    userSelect,
    absolutePosition,
} from "@library/styles/styleHelpers";
import { formElementsVariables } from "@library/components/forms/formElementStyles";
import { percent, px } from "csx";
import { styleFactory, useThemeCache } from "@library/styles/styleUtils";

export const attachmentVariables = useThemeCache(() => {
    const globalVars = globalVariables();
    const formElementVars = formElementsVariables();
    const themeVars = componentThemeVariables("attachment");

    const border = {
        color: globalVars.mixBgAndFg(0.2),
        style: "solid",
        width: formElementVars.border.width,
        radius: 0,
        ...themeVars.subComponentStyles("border"),
    };

    const sizing = {
        width: globalVars.embed.sizing.width,
        maxWidth: percent(100),
        ...themeVars.subComponentStyles("sizing"),
    };

    const padding = {
        default: 12,
        ...themeVars.subComponentStyles("padding"),
    };

    const shadows = {
        default: `0 1px 3px 0 ${globalVars.mainColors.fg.fade(0.3).toString()}`,
        ...themeVars.subComponentStyles("shadows"),
    };

    const text = {
        fontSize: globalVars.fonts.size.medium,
        ...themeVars.subComponentStyles("text"),
    };

    const title = {
        color: globalVars.mixBgAndFg(0.9),
        ...themeVars.subComponentStyles("title"),
    };

    const loading = {
        opacity: 0.5,
    };

    return { border, padding, shadows, text, title, loading, sizing };
});

export const attachmentClasses = useThemeCache(() => {
    const globalVars = globalVariables();
    const formElementVars = formElementsVariables();
    const vars = attachmentVariables();
    const style = styleFactory("attachment");

    const root = style({
        display: "block",
        position: "relative",
        textDecoration: "none",
        color: "inherit",
        boxShadow: vars.shadows.default,
        width: px(globalVars.embed.sizing.width),
        maxWidth: percent(100),
        margin: "auto",
        overflow: "hidden",
        ...userSelect(),
        ...borders(vars.border),
        $nest: {
            "&.isLoading, &.hasError": {
                cursor: "pointer",
                $nest: {
                    "&:hover": {
                        boxShadow: `0 0 0 ${px(
                            globalVars.embed.select.borderWidth,
                        )} ${globalVars.embed.focus.color.fade(0.5)} inset`,
                    },
                    "&:focus": {
                        boxShadow: `0 0 0 ${px(
                            globalVars.embed.select.borderWidth,
                        )} ${globalVars.embed.focus.color.toString()} inset`,
                    },
                },
            },
        },
    });

    const link = style("link", {
        ...allLinkStates({
            textDecoration: "none",
        }),
    });

    const box = style("box", {
        position: "relative",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: px(vars.padding.default),
        width: percent(100),
        ...borders({
            color: "transparent",
            width: 2,
            radius: 0,
        }),
    });

    const format = style("format", {
        flexBasis: px(globalVars.icon.sizes.small + vars.padding.default),
        height: unit(globalVars.icon.sizes.small),
        paddingRight: unit(vars.padding.default),
        flexShrink: 1,
    });

    const main = style("main", {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexGrow: 1,
    });

    const title = style("title", {
        fontSize: px(vars.text.fontSize),
        color: vars.title.color.toString(),
        fontWeight: globalVars.fonts.weights.semiBold,
        lineHeight: px(globalVars.icon.sizes.small),
    });

    const metas = style("metas", {
        marginBottom: px(0),
        lineHeight: globalVars.lineHeights.condensed,
    });

    const close = style("close", {
        ...margins({
            top: px(-((formElementVars.sizing.height - globalVars.icon.sizes.default) / 2)),
            right: px(-((formElementVars.sizing.height - globalVars.icon.sizes.default) / 2)),
        }),
        pointerEvents: "all",
    });

    const loadingProgress = style("loadingProgress", {
        ...absolutePosition.bottomLeft(),
        transition: `width ease-out .2s`,
        height: px(3),
        marginBottom: px(-1),
        width: 0,
        maxWidth: percent(100),
        backgroundColor: globalVars.mainColors.primary.toString(),
    });

    const loadingContent = style("loadingContent", {
        $nest: {
            ".attachment-format": {
                opacity: vars.loading.opacity,
            },
            ".attachment-main": {
                opacity: vars.loading.opacity,
            },
        },
    });

    return { root, link, box, format, main, title, metas, close, loadingProgress, loadingContent };
});
