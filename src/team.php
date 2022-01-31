<?php
require_once '../core/connect.php';

function get_latest_year($conn) {
  $result = $conn->query("SELECT MAX(year) AS year from teams");
  return $result->fetch_assoc()['year'];
}

function get_team_id($conn, $year, $number) {
  $stmt = $conn->prepare("SELECT team_id from teams WHERE year = ? ORDER BY sort ASC ");
  $stmt->bind_param('i', $year);
  $stmt->execute();
  $result = $stmt->get_result();
  $teams = [];

  if ($result->num_rows === 0) {
    return false;
  }

  while($row = $result->fetch_assoc()) {
    $teams[] = $row;
  }

  if (!array_key_exists($number, $teams)) {
    return false;
  }

  return $teams[$number]['team_id'];
}

function get_team_data($conn, $team_id) {
  $stmt = $conn->prepare("SELECT name, team_image, preview_image, description, year FROM teams WHERE team_id = ?");
  $stmt->bind_param('i', $team_id);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 0) {
    return false;
  }

  return $result->fetch_assoc();
}

function get_team_members($conn, $team_id) {
  $stmt = $conn->prepare("SELECT members.firstname, members.lastname, members.study, members.email, members.image, member_in_team.position_description FROM members, member_in_team WHERE member_in_team.team_id = ? AND member_in_team.member_id = members.member_id ORDER BY member_in_team.order ASC");
  $stmt->bind_param('i', $team_id);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
    return false;
  }

  $team_members  = [];

  while($row = $result->fetch_assoc()) {
    $team_members[] = $row;
  }
  return $team_members;
}

$number = (int)$_GET['number'];
$year = isset($_GET['year']) ? (int)$_GET['year'] : (int)get_latest_year($conn);

$output = array(
  'exist' =>  false,
  'name'  =>  null,
  'description' =>  null,
  'team_image'  =>  null,
  'preview_image' =>  null,
  'members' =>  array(),
);

$team_id = get_team_id($conn, $year, $number);
if ($team_id !== false) {
  $team_data = get_team_data($conn, $team_id);
  if ($team_data !== false) {
    $output['exist'] = true;
    $output['name'] = $team_data['name'];
    $output['description'] = $team_data['description'];
    $output['team_image'] = $team_data['team_image'];
    $output['preview_image'] = $team_data['preview_image'];
    $output['year'] = $team_data['year'];

    $team_members = get_team_members($conn, $team_id);
    if ($team_members !== false) {
      $output['members'] = $team_members;
    }
  }
}

$conn->close();
echo json_encode($output);