"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class VariableDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.TypeMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.VariableMixin, internal_1.Mixin.DefaultValueMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.VARIABLE_DEFINITION, node);
    }
}
exports.VariableDefinitionApi = VariableDefinitionApi;
function variableDefinitionApi(node) {
    return new VariableDefinitionApi(node);
}
exports.variableDefinitionApi = variableDefinitionApi;
