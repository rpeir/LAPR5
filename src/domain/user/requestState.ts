import {Result} from "../../core/logic/Result";
import {ValueObject} from "../../core/domain/ValueObject";

interface RequestStateProps {
    state:string
}
export class RequestState extends ValueObject<RequestStateProps>{
    get state (): string {
        return this.props.state;
    }
    private constructor (props: RequestStateProps) {
        super(props);
    }
    public static create (state: RequestStateProps): Result<RequestState> {
        const isValidState = RequestState.isValidState(state.state);
        if (!isValidState) {
            return Result.fail<RequestState>('Invalid state');
        } else {
            return Result.ok<RequestState>(new RequestState(state));
        }
    }
    public static isValidState (state: string): boolean {
        const states = ['pending', 'accepted', 'rejected'];
        return states.includes(state);
    }
}
