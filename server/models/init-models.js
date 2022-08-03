import Sequelize from "sequelize";
import config from "../config/config";

const sequelize = new Sequelize(
  config.db_name,
  config.db_username,
  config.db_password,
  {
    port: config.db_port,
    host: config.db_host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

var DataTypes = require("sequelize").DataTypes;
// Module master
var _address = require("./module_master/address");
var _address_type = require("./module_master/address_type");
var _category = require("./module_master/category");
var _city = require("./module_master/city");
var _country = require("./module_master/country");
var _modules = require("./module_master/modules");
var _province = require("./module_master/province");
var _route_actions = require("./module_master/route_actions");
var _skill_template = require("./module_master/skill_template");
var _skill_type = require("./module_master/skill_type");
var _status = require("./module_master/status");

// Module users
var _entity = require("./module_users/entity");
var _phone_number_type = require("./module_users/phone_number_type");
var _roles = require("./module_users/roles");
var _users = require("./module_users/users");
var _users_address = require("./module_users/users_address");
var _users_education = require("./module_users/users_education");
var _users_email = require("./module_users/users_email");
var _users_experiences = require("./module_users/users_experiences");
var _users_experiences_skill = require("./module_users/users_experiences_skill");
var _users_media = require("./module_users/users_media");
var _users_phones = require("./module_users/users_phones");
var _users_roles = require("./module_users/users_roles");
var _users_skill = require("./module_users/users_skill");

function initModels(sequelize) {
  // Module master
  var address = _address(sequelize, DataTypes);
  var address_type = _address_type(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var city = _city(sequelize, DataTypes);
  var country = _country(sequelize, DataTypes);
  var modules = _modules(sequelize, DataTypes);
  var province = _province(sequelize, DataTypes);
  var route_actions = _route_actions(sequelize, DataTypes);
  var skill_template = _skill_template(sequelize, DataTypes);
  var skill_type = _skill_type(sequelize, DataTypes);
  var status = _status(sequelize, DataTypes);

  // Module users
  var entity = _entity(sequelize, DataTypes);
  var phone_number_type = _phone_number_type(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_address = _users_address(sequelize, DataTypes);
  var users_education = _users_education(sequelize, DataTypes);
  var users_email = _users_email(sequelize, DataTypes);
  var users_experiences = _users_experiences(sequelize, DataTypes);
  var users_experiences_skill = _users_experiences_skill(sequelize, DataTypes);
  var users_media = _users_media(sequelize, DataTypes);
  var users_phones = _users_phones(sequelize, DataTypes);
  var users_roles = _users_roles(sequelize, DataTypes);
  var users_skill = _users_skill(sequelize, DataTypes);

  roles.belongsToMany(users, {
    as: "usro_entity_id_users",
    through: users_roles,
    foreignKey: "usro_role_id",
    otherKey: "usro_entity_id",
  });
  users.belongsToMany(roles, {
    as: "usro_role_id_roles",
    through: users_roles,
    foreignKey: "usro_entity_id",
    otherKey: "usro_role_id",
  });
  users_experiences.belongsToMany(users_skill, {
    as: "uesk_uski_id_users_skills",
    through: users_experiences_skill,
    foreignKey: "uesk_usex_id",
    otherKey: "uesk_uski_id",
  });
  users_skill.belongsToMany(users_experiences, {
    as: "uesk_usex_id_users_experiences",
    through: users_experiences_skill,
    foreignKey: "uesk_uski_id",
    otherKey: "uesk_usex_id",
  });
  users_address.belongsTo(address, {
    as: "etad_addr",
    foreignKey: "etad_addr_id",
  });
  address.hasOne(users_address, {
    as: "users_address",
    foreignKey: "etad_addr_id",
  });
  users_address.belongsTo(address_type, {
    as: "etad_adty",
    foreignKey: "etad_adty_id",
  });
  address_type.hasMany(users_address, {
    as: "users_addresses",
    foreignKey: "etad_adty_id",
  });
  category.belongsTo(category, { as: "cate_cate", foreignKey: "cate_cate_id" });
  category.hasMany(category, { as: "categories", foreignKey: "cate_cate_id" });
  address.belongsTo(city, { as: "addr_city", foreignKey: "addr_city_id" });
  city.hasMany(address, { as: "addresses", foreignKey: "addr_city_id" });
  users_experiences.belongsTo(city, {
    as: "usex_city",
    foreignKey: "usex_city_id",
  });
  city.hasMany(users_experiences, {
    as: "users_experiences",
    foreignKey: "usex_city_id",
  });
  province.belongsTo(country, {
    as: "prov_country_code_country",
    foreignKey: "prov_country_code",
  });
  country.hasMany(province, {
    as: "provinces",
    foreignKey: "prov_country_code",
  });
  users.belongsTo(entity, { as: "user_entity", foreignKey: "user_entity_id" });
  entity.hasOne(users, { as: "user", foreignKey: "user_entity_id" });
  route_actions.belongsTo(modules, {
    as: "roac_module_name_module",
    foreignKey: "roac_module_name",
  });
  modules.hasMany(route_actions, {
    as: "route_actions",
    foreignKey: "roac_module_name",
  });
  status.belongsTo(modules, {
    as: "status_module_module",
    foreignKey: "status_module",
  });
  modules.hasMany(status, { as: "statuses", foreignKey: "status_module" });
  users_phones.belongsTo(phone_number_type, {
    as: "uspo_ponty_code_phone_number_type",
    foreignKey: "uspo_ponty_code",
  });
  phone_number_type.hasMany(users_phones, {
    as: "users_phones",
    foreignKey: "uspo_ponty_code",
  });
  city.belongsTo(province, { as: "city_prov", foreignKey: "city_prov_id" });
  province.hasMany(city, { as: "cities", foreignKey: "city_prov_id" });
  users_roles.belongsTo(roles, { as: "usro_role", foreignKey: "usro_role_id" });
  roles.hasMany(users_roles, { as: "users_roles", foreignKey: "usro_role_id" });
  skill_template.belongsTo(skill_template, {
    as: "skte_skte",
    foreignKey: "skte_skte_id",
  });
  skill_template.hasMany(skill_template, {
    as: "skill_templates",
    foreignKey: "skte_skte_id",
  });
  skill_template.belongsTo(skill_type, {
    as: "skty_name_skill_type",
    foreignKey: "skty_name",
  });
  skill_type.hasMany(skill_template, {
    as: "skill_templates",
    foreignKey: "skty_name",
  });
  users_skill.belongsTo(skill_type, {
    as: "uski_skty_name_skill_type",
    foreignKey: "uski_skty_name",
  });
  skill_type.hasMany(users_skill, {
    as: "users_skills",
    foreignKey: "uski_skty_name",
  });
  users_address.belongsTo(users, {
    as: "etad_entity",
    foreignKey: "etad_entity_id",
  });
  users.hasMany(users_address, {
    as: "users_addresses",
    foreignKey: "etad_entity_id",
  });
  users_education.belongsTo(users, {
    as: "usdu_entity",
    foreignKey: "usdu_entity_id",
  });
  users.hasMany(users_education, {
    as: "users_educations",
    foreignKey: "usdu_entity_id",
  });
  users_email.belongsTo(users, {
    as: "pmail_entity",
    foreignKey: "pmail_entity_id",
  });
  users.hasMany(users_email, {
    as: "users_emails",
    foreignKey: "pmail_entity_id",
  });
  users_experiences.belongsTo(users, {
    as: "usex_entity",
    foreignKey: "usex_entity_id",
  });
  users.hasMany(users_experiences, {
    as: "users_experiences",
    foreignKey: "usex_entity_id",
  });
  users_media.belongsTo(users, {
    as: "usme_entity",
    foreignKey: "usme_entity_id",
  });
  users.hasMany(users_media, {
    as: "users_media",
    foreignKey: "usme_entity_id",
  });
  users_phones.belongsTo(users, {
    as: "uspo_entity",
    foreignKey: "uspo_entity_id",
  });
  users.hasOne(users_phones, {
    as: "users_phone",
    foreignKey: "uspo_entity_id",
  });
  users_roles.belongsTo(users, {
    as: "usro_entity",
    foreignKey: "usro_entity_id",
  });
  users.hasMany(users_roles, {
    as: "users_roles",
    foreignKey: "usro_entity_id",
  });
  users_skill.belongsTo(users, {
    as: "uski_entity",
    foreignKey: "uski_entity_id",
  });
  users.hasMany(users_skill, {
    as: "users_skills",
    foreignKey: "uski_entity_id",
  });
  users_experiences_skill.belongsTo(users_experiences, {
    as: "uesk_usex",
    foreignKey: "uesk_usex_id",
  });
  users_experiences.hasMany(users_experiences_skill, {
    as: "users_experiences_skills",
    foreignKey: "uesk_usex_id",
  });
  users_experiences_skill.belongsTo(users_skill, {
    as: "uesk_uski",
    foreignKey: "uesk_uski_id",
  });
  users_skill.hasMany(users_experiences_skill, {
    as: "users_experiences_skills",
    foreignKey: "uesk_uski_id",
  });

  return {
    address,
    address_type,
    category,
    city,
    country,
    entity,
    modules,
    phone_number_type,
    province,
    roles,
    route_actions,
    skill_template,
    skill_type,
    status,
    users,
    users_address,
    users_education,
    users_email,
    users_experiences,
    users_experiences_skill,
    users_media,
    users_phones,
    users_roles,
    users_skill,
  };
}

const models = initModels(sequelize)
export default models
export { sequelize }

// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
