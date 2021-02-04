import { ButtonModule } from "../../controls/button/button.module";
import { BladeParam } from "./blade-param";
import { BladeState } from "./blade-state";
import { BladeContext } from "./blader-context";

export interface BladeCreationParams {
    parent: BladeContext,
    key: string,
    params?: Array<BladeParam>;
    state?: BladeState;
}